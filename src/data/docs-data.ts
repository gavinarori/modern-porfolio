// Mock data for the API docs section. Swap the contents of `docsProjects`
// for your real endpoints when ready — every component in components/docs
// reads only from the shapes defined here, so the UI won't need to change.

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type ParamIn = "path" | "query" | "body" | "header"

export type EndpointParam = {
  name: string
  type: string
  in: ParamIn
  required: boolean
  description: string
}

export type CodeSample = {
  label: string
  language: string
  code: string
}

export type Endpoint = {
  id: string
  method: HttpMethod
  path: string
  summary: string
  description: string
  params?: EndpointParam[]
  responseExample: string
  codeSamples: CodeSample[]
}

export type EndpointGroup = {
  name: string
  description?: string
  endpoints: Endpoint[]
}

export type DocsProject = {
  slug: string
  name: string
  tagline: string
  description: string
  baseUrl: string
  auth: {
    type: string
    header: string
    description: string
  }
  groups: EndpointGroup[]
}

export const docsProjects: DocsProject[] = [

  {
    slug: "ticketing",
    name: "Arena",
    tagline: "High-concurrency multi-tenant ticketing API",
    description: `Arena is a multi-tenant, football-first ticketing platform built in Go for extreme concurrency (50k–200k+ simultaneous users on ticket drops) without ever overselling inventory.

## Architecture overview

Clean layered design:

- **domain** — pure entities + interfaces (no infrastructure imports)
- **service** — business logic, orchestration, idempotency, inventory rules
- **repository** — Postgres (source of truth) + Redis implementations of domain interfaces
- **handler** — chi HTTP, middleware, request/response mapping

Key infrastructure choices:

- **Postgres** — authoritative inventory, orders, tenants, audit log. Row-level locks + CHECK constraints prevent oversell at the database level.
- **Redis** — short-lived seat holds (distributed locks), waiting-room queues, rate limiting, and hot inventory counters. Holds expire automatically; a background sweep reconciles any drift.
- **Kafka / Redpanda** — async side-effects (email, webhooks, analytics, audit events). Never blocks the critical purchase path.
- **Payments** — Stripe + Adyen behind a single PaymentProvider interface so the rest of the system is provider-agnostic.
- **Tenant isolation** — every query and cache key is scoped by tenant_id. Middleware extracts tenant from the JWT (or API key) and injects it into context; repositories never accept a bare tenant_id from the client.

## Seat-locking algorithm (the critical path)

1. Client requests a hold on specific seats (or a “best available” request).
2. Service acquires a Redis lock (SET NX EX) for each seat with a short TTL (e.g. 8–12 minutes).
3. On success, a Postgres transaction creates a hold record and decrements the available counter under row-level lock.
4. Client receives a hold_id + expiry. Checkout must complete before expiry or the hold is released.
5. Background worker expires holds and releases inventory if payment never arrives.
6. Final sale runs in a single Postgres transaction that converts the hold → order + tickets and records an immutable inventory mutation audit row.

Trade-offs made explicit:

- Redis holds give low-latency contention handling at the cost of eventual consistency between Redis and Postgres. The reconciliation job + Postgres constraints close the window.
- We accept a small amount of “inventory holds that time out” rather than risk overselling. This is the correct trade-off for ticket drops.
- Kafka is used only for non-critical work; the purchase path itself is synchronous and transactional.

## Local development

1. Clone the repo and copy \`.env.example\` → \`.env\`.
2. \`docker compose up -d\` (Postgres 16, Redis 7, Redpanda + console, Adminer).
3. \`make migrate-up\`
4. \`make run-api\` (or \`go run ./cmd/api\`)
5. Health: \`curl localhost:8080/healthz\`
6. Ready (deps): \`curl localhost:8080/readyz\`

All three binaries (\`api\`, \`worker\`, \`migrate\`) share the same config package and fail fast on missing required env vars.

JWT auth is required for all non-health endpoints. Use the provided seed tenant + admin user or create one via the admin endpoints.`,
    baseUrl: "https://api.arena.tickets/v1",
    auth: {
      type: "Bearer JWT",
      header: "Authorization: Bearer eyJhbGciOiJIUzI1NiIs...",
      description:
        "All requests (except /healthz and /readyz) require a JWT issued by the auth service. The token contains tenant_id, user_id, and roles. Tenant isolation is enforced in middleware — you cannot access another tenant’s data even if you know the IDs.",
    },
    groups: [
      {
        name: "Health & Status",
        description: "Liveness and readiness probes used by Kubernetes / load balancers.",
        endpoints: [
          {
            id: "healthz",
            method: "GET",
            path: "/healthz",
            summary: "Liveness probe",
            description: "Returns 200 if the process is alive. Does not check downstream dependencies.",
            responseExample: `{
  "status": "ok"
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl https://api.arena.tickets/v1/healthz`,
              },
              {
                label: "JavaScript",
                language: "javascript",
                code: `const res = await fetch("https://api.arena.tickets/v1/healthz")
console.log(await res.json())`,
              },
              {
                label: "Python",
                language: "python",
                code: `import requests
print(requests.get("https://api.arena.tickets/v1/healthz").json())`,
              },
            ],
          },
          {
            id: "readyz",
            method: "GET",
            path: "/readyz",
            summary: "Readiness probe",
            description: "Pings Postgres and Redis. Returns 503 if any critical dependency is unreachable.",
            responseExample: `{
  "status": "ready",
  "checks": {
    "postgres": "ok",
    "redis": "ok"
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl https://api.arena.tickets/v1/readyz`,
              },
            ],
          },
        ],
      },
      {
        name: "Events",
        description: "Football matches and other ticketed events. Events belong to a tenant and reference a venue.",
        endpoints: [
          {
            id: "list-events",
            method: "GET",
            path: "/events",
            summary: "List events",
            description: "Returns events for the authenticated tenant, newest first. Supports filtering by status and date range.",
            params: [
              { name: "status", type: "string", in: "query", required: false, description: "Filter: draft | published | on_sale | sold_out | cancelled" },
              { name: "from", type: "string (ISO 8601)", in: "query", required: false, description: "Events starting on or after this datetime" },
              { name: "to", type: "string (ISO 8601)", in: "query", required: false, description: "Events starting on or before this datetime" },
              { name: "limit", type: "integer", in: "query", required: false, description: "Max results (default 20, max 100)" },
              { name: "cursor", type: "string", in: "query", required: false, description: "Pagination cursor from previous response" },
            ],
            responseExample: `{
  "data": [
    {
      "id": "evt_7f3a9c2b",
      "name": "Arsenal vs Chelsea",
      "slug": "arsenal-vs-chelsea-2026-04-12",
      "status": "on_sale",
      "starts_at": "2026-04-12T15:00:00Z",
      "venue_id": "ven_1a2b3c",
      "currency": "GBP",
      "min_price": 4500,
      "max_price": 25000,
      "available": 18420
    }
  ],
  "meta": {
    "next_cursor": "eyJpZCI6ImV2dF83ZjNhOWMyYiJ9",
    "has_more": true
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl "https://api.arena.tickets/v1/events?status=on_sale&limit=20" \\
  -H "Authorization: Bearer $TOKEN"`,
              },
              {
                label: "JavaScript",
                language: "javascript",
                code: `const res = await fetch("https://api.arena.tickets/v1/events?status=on_sale", {
  headers: { Authorization: \`Bearer \${token}\` },
})
const { data, meta } = await res.json()`,
              },
              {
                label: "Python",
                language: "python",
                code: `res = requests.get(
    "https://api.arena.tickets/v1/events",
    params={"status": "on_sale"},
    headers={"Authorization": f"Bearer {token}"},
)
data = res.json()["data"]`,
              },
            ],
          },
          {
            id: "get-event",
            method: "GET",
            path: "/events/{id}",
            summary: "Get event details",
            description: "Returns full event metadata including price categories and current availability summary.",
            params: [
              { name: "id", type: "string", in: "path", required: true, description: "Event ID (evt_…)" },
            ],
            responseExample: `{
  "id": "evt_7f3a9c2b",
  "name": "Arsenal vs Chelsea",
  "status": "on_sale",
  "starts_at": "2026-04-12T15:00:00Z",
  "ends_at": "2026-04-12T17:00:00Z",
  "venue": {
    "id": "ven_1a2b3c",
    "name": "Emirates Stadium",
    "capacity": 60704
  },
  "categories": [
    {
      "id": "cat_north_bank",
      "name": "North Bank",
      "price": 6500,
      "available": 4200
    }
  ],
  "sales_windows": [
    {
      "name": "General public",
      "starts_at": "2026-03-01T10:00:00Z",
      "ends_at": "2026-04-12T12:00:00Z"
    }
  ]
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl https://api.arena.tickets/v1/events/evt_7f3a9c2b \\
  -H "Authorization: Bearer $TOKEN"`,
              },
            ],
          },
          {
            id: "create-event",
            method: "POST",
            path: "/events",
            summary: "Create an event",
            description: "Creates a draft event. Requires admin or event-manager role. Inventory is not created until categories and a seating chart are attached.",
            params: [
              { name: "name", type: "string", in: "body", required: true, description: "Public display name" },
              { name: "venue_id", type: "string", in: "body", required: true, description: "Existing venue ID" },
              { name: "starts_at", type: "string (ISO 8601)", in: "body", required: true, description: "Kick-off time" },
              { name: "currency", type: "string", in: "body", required: true, description: "ISO 4217 currency code" },
              { name: "slug", type: "string", in: "body", required: false, description: "URL-safe slug; auto-generated if omitted" },
            ],
            responseExample: `{
  "id": "evt_7f3a9c2b",
  "name": "Arsenal vs Chelsea",
  "status": "draft",
  "created_at": "2026-02-18T11:04:22Z"
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST https://api.arena.tickets/v1/events \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Arsenal vs Chelsea",
    "venue_id": "ven_1a2b3c",
    "starts_at": "2026-04-12T15:00:00Z",
    "currency": "GBP"
  }'`,
              },
              {
                label: "JavaScript",
                language: "javascript",
                code: `const event = await fetch("https://api.arena.tickets/v1/events", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${token}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Arsenal vs Chelsea",
    venue_id: "ven_1a2b3c",
    starts_at: "2026-04-12T15:00:00Z",
    currency: "GBP",
  }),
}).then(r => r.json())`,
              },
            ],
          },
        ],
      },
      {
        name: "Inventory & Holds",
        description: "The high-concurrency critical path. Holds are short-lived Redis + Postgres records that reserve seats while the user checks out.",
        endpoints: [
          {
            id: "create-hold",
            method: "POST",
            path: "/holds",
            summary: "Create a seat hold",
            description: `Attempts to reserve one or more seats (or a quantity in a general-admission category) for a short period.

The request is idempotent when an Idempotency-Key header is supplied. On success the client receives a hold_id and an absolute expiry timestamp. The hold must be converted into an order before expiry or it is automatically released.

Under the hood this is the Redis SET NX EX + Postgres transaction path described in the architecture section.`,
            params: [
              { name: "event_id", type: "string", in: "body", required: true, description: "Event to reserve seats for" },
              { name: "items", type: "array", in: "body", required: true, description: "Array of { category_id, quantity } or { seat_ids: string[] }" },
              { name: "Idempotency-Key", type: "string", in: "header", required: false, description: "Client-generated unique key to make the request safely retryable" },
            ],
            responseExample: `{
  "id": "hld_9e2b4f1a",
  "event_id": "evt_7f3a9c2b",
  "status": "active",
  "expires_at": "2026-03-15T14:22:18Z",
  "items": [
    {
      "category_id": "cat_north_bank",
      "quantity": 2,
      "unit_price": 6500,
      "seat_ids": ["A-12-14", "A-12-15"]
    }
  ],
  "total": 13000,
  "currency": "GBP"
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST https://api.arena.tickets/v1/holds \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000" \\
  -d '{
    "event_id": "evt_7f3a9c2b",
    "items": [
      { "category_id": "cat_north_bank", "quantity": 2 }
    ]
  }'`,
              },
              {
                label: "JavaScript",
                language: "javascript",
                code: `const hold = await fetch("https://api.arena.tickets/v1/holds", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${token}\`,
    "Content-Type": "application/json",
    "Idempotency-Key": crypto.randomUUID(),
  },
  body: JSON.stringify({
    event_id: "evt_7f3a9c2b",
    items: [{ category_id: "cat_north_bank", quantity: 2 }],
  }),
}).then(r => r.json())`,
              },
              {
                label: "Python",
                language: "python",
                code: `import uuid
res = requests.post(
    "https://api.arena.tickets/v1/holds",
    headers={
        "Authorization": f"Bearer {token}",
        "Idempotency-Key": str(uuid.uuid4()),
    },
    json={
        "event_id": "evt_7f3a9c2b",
        "items": [{"category_id": "cat_north_bank", "quantity": 2}],
    },
)
hold = res.json()`,
              },
            ],
          },
          {
            id: "get-hold",
            method: "GET",
            path: "/holds/{id}",
            summary: "Retrieve a hold",
            description: "Returns the current state of a hold. Useful for polling remaining time before checkout.",
            params: [
              { name: "id", type: "string", in: "path", required: true, description: "Hold ID (hld_…)" },
            ],
            responseExample: `{
  "id": "hld_9e2b4f1a",
  "status": "active",
  "expires_at": "2026-03-15T14:22:18Z",
  "seconds_remaining": 412,
  "total": 13000
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl https://api.arena.tickets/v1/holds/hld_9e2b4f1a \\
  -H "Authorization: Bearer $TOKEN"`,
              },
            ],
          },
          {
            id: "release-hold",
            method: "DELETE",
            path: "/holds/{id}",
            summary: "Release a hold early",
            description: "Explicitly cancels an active hold and returns the seats to inventory. Idempotent.",
            params: [
              { name: "id", type: "string", in: "path", required: true, description: "Hold ID" },
            ],
            responseExample: `{
  "id": "hld_9e2b4f1a",
  "status": "released"
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X DELETE https://api.arena.tickets/v1/holds/hld_9e2b4f1a \\
  -H "Authorization: Bearer $TOKEN"`,
              },
            ],
          },
        ],
      },
      {
        name: "Orders & Checkout",
        description: "Convert an active hold into a paid order. The entire conversion happens inside a single Postgres transaction.",
        endpoints: [
          {
            id: "create-order",
            method: "POST",
            path: "/orders",
            summary: "Create order from hold",
            description: `Converts an active hold into an order and initiates payment.

Requires the hold to still be valid. The request is idempotent via Idempotency-Key. On success the response contains a payment intent (Stripe / Adyen) that the client must confirm. Once payment succeeds a webhook or polling endpoint finalizes the tickets.`,
            params: [
              { name: "hold_id", type: "string", in: "body", required: true, description: "Active hold to convert" },
              { name: "customer", type: "object", in: "body", required: true, description: "{ email, first_name, last_name, phone? }" },
              { name: "payment_method", type: "string", in: "body", required: false, description: "Preferred provider: stripe | adyen (default stripe)" },
              { name: "Idempotency-Key", type: "string", in: "header", required: true, description: "Required for all order creation requests" },
            ],
            responseExample: `{
  "id": "ord_4c8e2d91",
  "status": "pending_payment",
  "hold_id": "hld_9e2b4f1a",
  "total": 13000,
  "currency": "GBP",
  "payment": {
    "provider": "stripe",
    "client_secret": "pi_3Nq…_secret_…",
    "publishable_key": "pk_live_…"
  },
  "expires_at": "2026-03-15T14:22:18Z"
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST https://api.arena.tickets/v1/orders \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: $(uuidgen)" \\
  -d '{
    "hold_id": "hld_9e2b4f1a",
    "customer": {
      "email": "fan@example.com",
      "first_name": "Alex",
      "last_name": "Morgan"
    }
  }'`,
              },
              {
                label: "JavaScript",
                language: "javascript",
                code: `const order = await fetch("https://api.arena.tickets/v1/orders", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${token}\`,
    "Content-Type": "application/json",
    "Idempotency-Key": crypto.randomUUID(),
  },
  body: JSON.stringify({
    hold_id: "hld_9e2b4f1a",
    customer: {
      email: "fan@example.com",
      first_name: "Alex",
      last_name: "Morgan",
    },
  }),
}).then(r => r.json())

// Then confirm payment with Stripe.js using order.payment.client_secret`,
              },
            ],
          },
          {
            id: "get-order",
            method: "GET",
            path: "/orders/{id}",
            summary: "Retrieve an order",
            description: "Returns order status, line items, and ticket download links once the order is paid.",
            params: [
              { name: "id", type: "string", in: "path", required: true, description: "Order ID (ord_…)" },
            ],
            responseExample: `{
  "id": "ord_4c8e2d91",
  "status": "paid",
  "total": 13000,
  "currency": "GBP",
  "tickets": [
    {
      "id": "tkt_a1b2c3",
      "seat": "A-12-14",
      "barcode": "https://api.arena.tickets/v1/tickets/tkt_a1b2c3/barcode",
      "pdf": "https://api.arena.tickets/v1/tickets/tkt_a1b2c3/pdf"
    }
  ],
  "paid_at": "2026-03-15T14:18:03Z"
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl https://api.arena.tickets/v1/orders/ord_4c8e2d91 \\
  -H "Authorization: Bearer $TOKEN"`,
              },
            ],
          },
        ],
      },
      {
        name: "Webhooks",
        description: "Outbound webhooks for order and inventory events. Delivered via the worker process with exponential backoff.",
        endpoints: [
          {
            id: "register-webhook",
            method: "POST",
            path: "/webhooks",
            summary: "Register a webhook endpoint",
            description: "Subscribes a URL to one or more event types. The signing secret is returned only once at creation time.",
            params: [
              { name: "url", type: "string", in: "body", required: true, description: "HTTPS endpoint that will receive POST payloads" },
              { name: "events", type: "array", in: "body", required: true, description: "Event types, e.g. [\"order.paid\", \"hold.expired\", \"inventory.low\"]" },
            ],
            responseExample: `{
  "id": "wh_3f91a2",
  "url": "https://your-app.com/hooks/arena",
  "events": ["order.paid", "hold.expired"],
  "signing_secret": "whsec_8f2a1c9e…"
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST https://api.arena.tickets/v1/webhooks \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/hooks/arena",
    "events": ["order.paid", "hold.expired"]
  }'`,
              },
            ],
          },
        ],
      },
      {
        name: "Admin / Tenants",
        description: "Tenant management and elevated operations. Requires admin role.",
        endpoints: [
          {
            id: "list-tenants",
            method: "GET",
            path: "/admin/tenants",
            summary: "List tenants (platform admin only)",
            description: "Platform-level endpoint. Not available to ordinary tenant admins.",
            responseExample: `{
  "data": [
    {
      "id": "ten_arsenal",
      "name": "Arsenal FC",
      "slug": "arsenal",
      "status": "active",
      "created_at": "2025-11-02T09:00:00Z"
    }
  ]
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl https://api.arena.tickets/v1/admin/tenants \\
  -H "Authorization: Bearer $PLATFORM_ADMIN_TOKEN"`,
              },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Ledger (existing)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "ledger",
    name: "Ledger",
    tagline: "Payments & invoicing API",
    description:
      "Ledger handles customers, invoices, and payment capture for subscription and one-off billing. Built for teams who need programmatic control over the full invoice lifecycle without owning a payments stack.",
    baseUrl: "https://api.ledger.dev/v1",
    auth: {
      type: "Bearer token",
      header: "Authorization: Bearer sk_live_••••••••",
      description:
        "Every request needs a secret key in the Authorization header. Keys are scoped per environment — use sk_test_ keys against the sandbox base URL while integrating.",
    },
    groups: [
      {
        name: "Customers",
        description: "Create and look up the people or organizations you bill.",
        endpoints: [
          {
            id: "list-customers",
            method: "GET",
            path: "/customers",
            summary: "List customers",
            description:
              "Returns customers in reverse-chronological order. Use `starting_after` with the last id from a previous page to paginate.",
            params: [
              { name: "limit", type: "integer", in: "query", required: false, description: "Max results to return. Defaults to 20, max 100." },
              { name: "starting_after", type: "string", in: "query", required: false, description: "Cursor for pagination — the id of the last customer on the previous page." },
              { name: "email", type: "string", in: "query", required: false, description: "Filter to an exact email match." },
            ],
            responseExample: `{
  "data": [
    {
      "id": "cus_9f2a1b",
      "name": "Mercer Coffee Co.",
      "email": "billing@mercercoffee.com",
      "created_at": "2026-03-11T09:22:00Z"
    }
  ],
  "has_more": false
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl https://api.ledger.dev/v1/customers \\
  -H "Authorization: Bearer sk_live_••••••••"` },
              { label: "JavaScript", language: "javascript", code: `const res = await fetch("https://api.ledger.dev/v1/customers", {
  headers: { Authorization: \`Bearer \${process.env.LEDGER_KEY}\` },
})
const { data } = await res.json()` },
              { label: "Python", language: "python", code: `import requests

res = requests.get(
    "https://api.ledger.dev/v1/customers",
    headers={"Authorization": f"Bearer {LEDGER_KEY}"},
)
data = res.json()["data"]` },
            ],
          },
          {
            id: "create-customer",
            method: "POST",
            path: "/customers",
            summary: "Create a customer",
            description: "Creates a customer record. `email` is the only required field — everything else can be filled in later.",
            params: [
              { name: "email", type: "string", in: "body", required: true, description: "Primary contact email. Used for invoice delivery." },
              { name: "name", type: "string", in: "body", required: false, description: "Display name shown on invoices." },
              { name: "metadata", type: "object", in: "body", required: false, description: "Arbitrary key-value pairs to store alongside the customer." },
            ],
            responseExample: `{
  "id": "cus_9f2a1b",
  "name": "Mercer Coffee Co.",
  "email": "billing@mercercoffee.com",
  "created_at": "2026-03-11T09:22:00Z"
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl -X POST https://api.ledger.dev/v1/customers \\
  -H "Authorization: Bearer sk_live_••••••••" \\
  -d email="billing@mercercoffee.com" \\
  -d name="Mercer Coffee Co."` },
              { label: "JavaScript", language: "javascript", code: `const res = await fetch("https://api.ledger.dev/v1/customers", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.LEDGER_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "billing@mercercoffee.com",
    name: "Mercer Coffee Co.",
  }),
})
const customer = await res.json()` },
              { label: "Python", language: "python", code: `res = requests.post(
    "https://api.ledger.dev/v1/customers",
    headers={"Authorization": f"Bearer {LEDGER_KEY}"},
    json={"email": "billing@mercercoffee.com", "name": "Mercer Coffee Co."},
)
customer = res.json()` },
            ],
          },
        ],
      },
      {
        name: "Invoices",
        description: "Build, send, and track invoices against a customer.",
        endpoints: [
          {
            id: "create-invoice",
            method: "POST",
            path: "/invoices",
            summary: "Create an invoice",
            description: "Creates a draft invoice for a customer. Invoices stay in `draft` until sent — use the send endpoint below to finalize and deliver it.",
            params: [
              { name: "customer_id", type: "string", in: "body", required: true, description: "The customer this invoice bills." },
              { name: "line_items", type: "array", in: "body", required: true, description: "Array of { description, amount, quantity } objects." },
              { name: "due_date", type: "string (ISO 8601)", in: "body", required: false, description: "Defaults to 30 days from send." },
            ],
            responseExample: `{
  "id": "inv_71ac4d",
  "status": "draft",
  "customer_id": "cus_9f2a1b",
  "total": 48000,
  "currency": "usd",
  "due_date": "2026-04-10T00:00:00Z"
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl -X POST https://api.ledger.dev/v1/invoices \\
  -H "Authorization: Bearer sk_live_••••••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_id": "cus_9f2a1b",
    "line_items": [{ "description": "March retainer", "amount": 48000, "quantity": 1 }]
  }'` },
              { label: "JavaScript", language: "javascript", code: `const invoice = await fetch("https://api.ledger.dev/v1/invoices", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.LEDGER_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    customer_id: "cus_9f2a1b",
    line_items: [{ description: "March retainer", amount: 48000, quantity: 1 }],
  }),
}).then((r) => r.json())` },
              { label: "Python", language: "python", code: `invoice = requests.post(
    "https://api.ledger.dev/v1/invoices",
    headers={"Authorization": f"Bearer {LEDGER_KEY}"},
    json={
        "customer_id": "cus_9f2a1b",
        "line_items": [{"description": "March retainer", "amount": 48000, "quantity": 1}],
    },
).json()` },
            ],
          },
          {
            id: "send-invoice",
            method: "POST",
            path: "/invoices/{id}/send",
            summary: "Send an invoice",
            description: "Finalizes a draft invoice and emails it to the customer on file. Once sent, line items are locked.",
            params: [
              { name: "id", type: "string", in: "path", required: true, description: "The invoice id, e.g. inv_71ac4d." },
            ],
            responseExample: `{
  "id": "inv_71ac4d",
  "status": "sent",
  "sent_at": "2026-03-12T14:05:00Z"
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl -X POST https://api.ledger.dev/v1/invoices/inv_71ac4d/send \\
  -H "Authorization: Bearer sk_live_••••••••"` },
              { label: "JavaScript", language: "javascript", code: `await fetch(\`https://api.ledger.dev/v1/invoices/\${invoiceId}/send\`, {
  method: "POST",
  headers: { Authorization: \`Bearer \${process.env.LEDGER_KEY}\` },
})` },
              { label: "Python", language: "python", code: `requests.post(
    f"https://api.ledger.dev/v1/invoices/{invoice_id}/send",
    headers={"Authorization": f"Bearer {LEDGER_KEY}"},
)` },
            ],
          },
          {
            id: "get-invoice",
            method: "GET",
            path: "/invoices/{id}",
            summary: "Retrieve an invoice",
            description: "Fetches a single invoice, including its current status and payment history.",
            params: [
              { name: "id", type: "string", in: "path", required: true, description: "The invoice id." },
            ],
            responseExample: `{
  "id": "inv_71ac4d",
  "status": "paid",
  "total": 48000,
  "amount_paid": 48000,
  "paid_at": "2026-03-14T09:00:00Z"
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl https://api.ledger.dev/v1/invoices/inv_71ac4d \\
  -H "Authorization: Bearer sk_live_••••••••"` },
              { label: "JavaScript", language: "javascript", code: `const invoice = await fetch(\`https://api.ledger.dev/v1/invoices/\${id}\`, {
  headers: { Authorization: \`Bearer \${process.env.LEDGER_KEY}\` },
}).then((r) => r.json())` },
              { label: "Python", language: "python", code: `invoice = requests.get(
    f"https://api.ledger.dev/v1/invoices/{invoice_id}",
    headers={"Authorization": f"Bearer {LEDGER_KEY}"},
).json()` },
            ],
          },
        ],
      },
      {
        name: "Webhooks",
        description: "Get notified when invoice and payment state changes.",
        endpoints: [
          {
            id: "register-webhook",
            method: "POST",
            path: "/webhooks",
            summary: "Register a webhook endpoint",
            description: "Registers a URL to receive event notifications. Ledger retries failed deliveries with exponential backoff for 24 hours.",
            params: [
              { name: "url", type: "string", in: "body", required: true, description: "HTTPS endpoint to receive event payloads." },
              { name: "events", type: "array", in: "body", required: true, description: "Event types to subscribe to, e.g. [\"invoice.paid\"]." },
            ],
            responseExample: `{
  "id": "wh_3c81e2",
  "url": "https://mercercoffee.com/hooks/ledger",
  "events": ["invoice.paid", "invoice.overdue"],
  "signing_secret": "whsec_••••••••"
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl -X POST https://api.ledger.dev/v1/webhooks \\
  -H "Authorization: Bearer sk_live_••••••••" \\
  -H "Content-Type: application/json" \\
  -d '{ "url": "https://mercercoffee.com/hooks/ledger", "events": ["invoice.paid"] }'` },
              { label: "JavaScript", language: "javascript", code: `await fetch("https://api.ledger.dev/v1/webhooks", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.LEDGER_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "https://mercercoffee.com/hooks/ledger",
    events: ["invoice.paid"],
  }),
})` },
              { label: "Python", language: "python", code: `requests.post(
    "https://api.ledger.dev/v1/webhooks",
    headers={"Authorization": f"Bearer {LEDGER_KEY}"},
    json={"url": "https://mercercoffee.com/hooks/ledger", "events": ["invoice.paid"]},
)` },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Signal (existing)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "signal",
    name: "Signal",
    tagline: "Realtime events & notifications API",
    description:
      "Signal moves events from your backend to your users in real time — push a payload to a channel and every connected client receives it over a persistent connection, with delivery falling back to webhooks when no one's listening.",
    baseUrl: "https://api.signal.dev/v1",
    auth: {
      type: "API key",
      header: "X-API-Key: sig_live_••••••••",
      description:
        "Pass your API key on every request via the X-API-Key header. Realtime connections authenticate the same key as a query parameter during the WebSocket handshake.",
    },
    groups: [
      {
        name: "Channels",
        description: "Named streams that clients subscribe to and you publish events into.",
        endpoints: [
          {
            id: "create-channel",
            method: "POST",
            path: "/channels",
            summary: "Create a channel",
            description: "Creates a named channel. Channel names must be unique within your project and are used directly by clients when subscribing.",
            params: [
              { name: "name", type: "string", in: "body", required: true, description: "Unique channel identifier, e.g. \"room-482\"." },
              { name: "private", type: "boolean", in: "body", required: false, description: "If true, clients must present a per-user auth token to subscribe. Defaults to false." },
            ],
            responseExample: `{
  "id": "chn_5b91f0",
  "name": "room-482",
  "private": false,
  "created_at": "2026-05-02T18:11:00Z"
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl -X POST https://api.signal.dev/v1/channels \\
  -H "X-API-Key: sig_live_••••••••" \\
  -d name="room-482"` },
              { label: "JavaScript", language: "javascript", code: `const channel = await fetch("https://api.signal.dev/v1/channels", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.SIGNAL_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "room-482" }),
}).then((r) => r.json())` },
              { label: "Python", language: "python", code: `channel = requests.post(
    "https://api.signal.dev/v1/channels",
    headers={"X-API-Key": SIGNAL_KEY},
    json={"name": "room-482"},
).json()` },
            ],
          },
          {
            id: "list-channels",
            method: "GET",
            path: "/channels",
            summary: "List channels",
            description: "Returns every channel in your project, with current subscriber counts.",
            responseExample: `{
  "data": [
    { "id": "chn_5b91f0", "name": "room-482", "subscribers": 14 }
  ]
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl https://api.signal.dev/v1/channels \\
  -H "X-API-Key: sig_live_••••••••"` },
              { label: "JavaScript", language: "javascript", code: `const { data } = await fetch("https://api.signal.dev/v1/channels", {
  headers: { "X-API-Key": process.env.SIGNAL_KEY },
}).then((r) => r.json())` },
              { label: "Python", language: "python", code: `data = requests.get(
    "https://api.signal.dev/v1/channels",
    headers={"X-API-Key": SIGNAL_KEY},
).json()["data"]` },
            ],
          },
        ],
      },
      {
        name: "Events",
        description: "Publish payloads into a channel for connected clients to receive.",
        endpoints: [
          {
            id: "publish-event",
            method: "POST",
            path: "/events",
            summary: "Publish an event",
            description: "Publishes an event to a channel. Connected clients receive it within milliseconds; if nobody's subscribed, it's dropped unless `persist` is set.",
            params: [
              { name: "channel", type: "string", in: "body", required: true, description: "Name of the target channel." },
              { name: "type", type: "string", in: "body", required: true, description: "Event type clients use to route the payload, e.g. \"message.created\"." },
              { name: "payload", type: "object", in: "body", required: true, description: "Arbitrary JSON delivered to subscribers as-is." },
              { name: "persist", type: "boolean", in: "body", required: false, description: "Store the event so late subscribers can replay it. Defaults to false." },
            ],
            responseExample: `{
  "id": "evt_28d4a7",
  "channel": "room-482",
  "delivered_to": 14,
  "published_at": "2026-05-02T18:12:41Z"
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl -X POST https://api.signal.dev/v1/events \\
  -H "X-API-Key: sig_live_••••••••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channel": "room-482",
    "type": "message.created",
    "payload": { "text": "hey" }
  }'` },
              { label: "JavaScript", language: "javascript", code: `await fetch("https://api.signal.dev/v1/events", {
  method: "POST",
  headers: {
    "X-API-Key": process.env.SIGNAL_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    channel: "room-482",
    type: "message.created",
    payload: { text: "hey" },
  }),
})` },
              { label: "Python", language: "python", code: `requests.post(
    "https://api.signal.dev/v1/events",
    headers={"X-API-Key": SIGNAL_KEY},
    json={
        "channel": "room-482",
        "type": "message.created",
        "payload": {"text": "hey"},
    },
)` },
            ],
          },
        ],
      },
      {
        name: "Realtime",
        description: "Open a persistent connection to receive events as they're published.",
        endpoints: [
          {
            id: "connect-realtime",
            method: "GET",
            path: "/realtime/connect",
            summary: "Open a realtime connection",
            description: "Upgrades to a WebSocket connection. Subscribe to one or more channels after connecting by sending a `{ \"action\": \"subscribe\", \"channel\": \"...\" }` frame.",
            params: [
              { name: "key", type: "string", in: "query", required: true, description: "Your API key, passed as a query param during the handshake." },
            ],
            responseExample: `// Frame received after subscribing
{
  "channel": "room-482",
  "type": "message.created",
  "payload": { "text": "hey" },
  "published_at": "2026-05-02T18:12:41Z"
}`,
            codeSamples: [
              { label: "JavaScript", language: "javascript", code: `const ws = new WebSocket(
  \`wss://api.signal.dev/v1/realtime/connect?key=\${SIGNAL_KEY}\`
)

ws.onopen = () => {
  ws.send(JSON.stringify({ action: "subscribe", channel: "room-482" }))
}

ws.onmessage = (msg) => {
  const event = JSON.parse(msg.data)
  console.log(event.type, event.payload)
}` },
              { label: "Python", language: "python", code: `import websockets, json, asyncio

async def listen():
    uri = f"wss://api.signal.dev/v1/realtime/connect?key={SIGNAL_KEY}"
    async with websockets.connect(uri) as ws:
        await ws.send(json.dumps({"action": "subscribe", "channel": "room-482"}))
        async for message in ws:
            event = json.loads(message)
            print(event["type"], event["payload"])

asyncio.run(listen())` },
            ],
          },
        ],
      },
    ],
  },
]

export function getDocsProject(slug: string) {
  return docsProjects.find((project) => project.slug === slug)
}
