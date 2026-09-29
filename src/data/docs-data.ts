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

// ── Additive types for architecture / trade-off / local-setup prose ──
// Optional so existing projects (Ledger, Signal) don't need to supply them.

export type ArchitectureSection = {
  heading: string
  body: string
  bullets?: string[]
}

export type SetupStep = {
  title: string
  description: string
  command?: string
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
  githubUrl?: string
  architecture?: {
    intro: string
    sections: ArchitectureSection[]
    tradeoffs: string[]
  }
  localSetup?: {
    intro?: string
    steps: SetupStep[]
  }
  groups: EndpointGroup[]
}

export const docsProjects: DocsProject[] = [

  // ─────────────────────────────────────────────────────────────
  // Ticketing (real project — local only, no hosted deployment)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "ticketing",
    name: "Ticketing Platform",
    tagline: "Multi-tenant event ticketing backend",
    description:
      "A multi-tenant ticketing backend in Go: waiting-room admission, Redis-backed seat holds, transactional order confirmation, and an outbox-pattern email dispatcher. Runs entirely on localhost — no hosted environment.",
    baseUrl: "http://localhost:8080",
    auth: {
      type: "Bearer JWT",
      header: "Authorization: Bearer <access_token>",
      description:
        "Fan and admin endpoints require a JWT from /auth/login (Authorization: Bearer <token>). Tenant scope is never taken from a header on authenticated calls — it's embedded in the token itself. Public, pre-auth endpoints (event browsing, joining the queue) instead require an X-Tenant-ID header. The one exception is admin bootstrap, which uses a shared X-Bootstrap-Secret instead of a JWT, since it exists to create the very first admin for a tenant.",
    },
    githubUrl: "https://github.com/gavinarori/ticketing-backend",
    architecture: {
      intro:
        "Clean layered design — domain (entities + interfaces, no infrastructure imports), service (business logic, transactions, idempotency), repository (Postgres + Redis implementations), handler (chi HTTP + middleware). Two binaries share the same config and domain code: cmd/api serves requests, cmd/worker runs the background tickers.",
      sections: [
        {
          heading: "Data stores",
          body: "Postgres is the source of truth for tenants, users, venues, events, inventory, orders, and the notification outbox. Redis holds everything short-lived and high-churn.",
          bullets: [
            "Postgres — row-level locks + CHECK constraints prevent overselling inventory at the database level, independent of application logic",
            "Redis — waiting-room queues and seat holds, both with TTLs; a worker sweep reconciles anything that drifts",
          ],
        },
        {
          heading: "Multi-tenancy",
          body: "Every query is scoped by tenant_id, but the source of that scope differs by endpoint type.",
          bullets: [
            "Authenticated endpoints (fan or admin) — tenant comes from the JWT, never a client-supplied header, so a valid token for tenant A can't be pointed at tenant B's data",
            "Public endpoints (browsing events, joining the queue before login) — tenant comes from X-Tenant-ID, since there's no token yet to carry it",
          ],
        },
        {
          heading: "Waiting room & admission",
          body: "Joining the queue is an HTTP call, but admission out of it deliberately is not.",
          bullets: [
            "POST /events/{id}/queue enqueues a fan; GET on the same path reports position and whether they're admitted",
            "Admission only happens via the worker's ticker (or AdmitNext internally) — there is no HTTP route that jumps the queue",
            "HoldSeat requires admitted: true first, so cmd/worker has to be running for the purchase path to complete end to end",
          ],
        },
        {
          heading: "Payments",
          body: "Stripe integration runs in mock mode whenever STRIPE_SECRET_KEY is left empty, which is the expected local setup.",
          bullets: [
            "Mock mode returns deterministic responses instead of calling out to Stripe, so the full authorize → webhook → paid flow is testable with no real keys",
            "Webhook signatures still have to be computed by the caller: hex(HMAC-SHA256(raw_body, STRIPE_WEBHOOK_SECRET)) — no timestamp prefix, unlike Stripe's real t=...,v1=... format",
          ],
        },
        {
          heading: "Notifications (outbox pattern)",
          body: "Order confirmation emails are queued, not sent inline, so a slow or failing email provider can never affect payment confirmation.",
          bullets: [
            "ConfirmPayment enqueues a notification row in the same Postgres transaction that marks the order paid — both commit or neither does",
            "cmd/worker's dispatch loop picks up pending notifications and sends them through a swappable EmailSender (SMTP in real config, a console logger when SMTP_* is unset)",
          ],
        },
      ],
      tradeoffs: [
        "Redis holds give low-latency contention handling at the cost of eventual consistency with Postgres — accepted because a hold that times out is a far better failure mode than overselling a seat",
        "Waiting-room admission is intentionally worker-only with no direct HTTP path, trading a bit of testing convenience for a queue that can't be bypassed",
        "Mock payment mode trades payment realism for full local testability — the webhook signature still has to be computed correctly, so the integration is exercised, just not against real Stripe",
        "Notifications are fully decoupled via an outbox table rather than sent synchronously — a stalled email provider can never block or roll back a paid order",
      ],
    },
    localSetup: {
      intro:
        "Everything below runs against localhost only. Two terminals are needed: cmd/api serves the endpoints below; cmd/worker handles waiting-room admission and email dispatch, and the purchase path won't complete without it.",
      steps: [
        {
          title: "Start Postgres and Redis",
          description:
            "Bring up local infra with Docker, or point the API at your own Postgres/Redis instances via the env vars in the next step.",
          command: "docker-compose up -d",
        },
        {
          title: "Configure environment",
          description:
            "Copy the example env file and fill in DATABASE_URL, REDIS_ADDR, JWT_SECRET, JWT_REFRESH_SECRET, and ADMIN_BOOTSTRAP_SECRET. Leave STRIPE_SECRET_KEY empty to run payments in mock mode — that's the intended local setup. SMTP_* is optional; without it, the worker logs emails to the console instead of sending them.",
          command: "cp .env.example .env",
        },
        {
          title: "Run migrations",
          description: "Pulls dependencies and applies every migration up to the current schema.",
          command: "go mod tidy && make migrate-up",
        },
        {
          title: "Start the API server",
          description: "This is the only binary that serves HTTP traffic — every endpoint below talks to it.",
          command: "go run ./cmd/api",
        },
        {
          title: "Start the worker (second terminal)",
          description:
            "Runs the waiting-room admission ticker and the notification dispatch loop. Without this running, joining the queue will never flip to admitted: true and paid orders will never send a confirmation email.",
          command: "go run ./cmd/worker",
        },
        {
          title: "Seed a tenant",
          description:
            "There's no endpoint for this yet — it's a direct insert. Keep the returned id; it's the X-Tenant-ID for every public request and the tenant_id for bootstrap.",
          command:
            "INSERT INTO tenants (id, slug, name) VALUES (gen_random_uuid(), 'my-club', 'My Club') RETURNING id;",
        },
        {
          title: "Bootstrap the first admin",
          description:
            "Uses the shared X-Bootstrap-Secret rather than a JWT, since no admin exists yet to issue one. See Admin Bootstrap below for the full request.",
        },
        {
          title: "Verify",
          description: "Confirms the API is up and that it can reach Postgres and Redis.",
          command: "curl localhost:8080/healthz && curl localhost:8080/readyz",
        },
      ],
    },
    groups: [
      {
        name: "Health & Status",
        description: "No auth required. Used for liveness/readiness checks, not by fans or admins.",
        endpoints: [
          {
            id: "healthz",
            method: "GET",
            path: "/healthz",
            summary: "Liveness probe",
            description: "Returns 200 if the process is alive. Does not check Postgres or Redis.",
            responseExample: `{
  "status": "ok"
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl http://localhost:8080/healthz` },
            ],
          },
          {
            id: "readyz",
            method: "GET",
            path: "/readyz",
            summary: "Readiness probe",
            description: "Pings Postgres and Redis. Returns 503 if either is unreachable.",
            responseExample: `{
  "status": "ready",
  "checks": {
    "postgres": "ok",
    "redis": "ok"
  }
}`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl http://localhost:8080/readyz` },
            ],
          },
        ],
      },
      {
        name: "Auth",
        description: "Registration and login are public. Refresh rotates the token pair; the old refresh token is invalidated on use.",
        endpoints: [
          {
            id: "auth-register",
            method: "POST",
            path: "/api/v1/auth/register",
            summary: "Register a fan",
            description: "Always creates a fan-role account — there's no role field to set here. Admins are created only via bootstrap.",
            params: [
              { name: "email", type: "string", in: "body", required: true, description: "Must be unique" },
              { name: "password", type: "string", in: "body", required: true, description: "Plaintext over the wire, hashed server-side" },
              { name: "first_name", type: "string", in: "body", required: true, description: "" },
              { name: "last_name", type: "string", in: "body", required: true, description: "" },
            ],
            responseExample: `{
  "data": {
    "id": "usr_2f1a9c",
    "email": "fan@example.com",
    "role": "fan"
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "fan@example.com",
    "password": "hunter2-but-better",
    "first_name": "Alex",
    "last_name": "Morgan"
  }'`,
              },
            ],
          },
          {
            id: "auth-login",
            method: "POST",
            path: "/api/v1/auth/login",
            summary: "Log in",
            description: "Works for both fan and admin accounts. Returns an access/refresh pair.",
            params: [
              { name: "email", type: "string", in: "body", required: true, description: "" },
              { name: "password", type: "string", in: "body", required: true, description: "" },
            ],
            responseExample: `{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_at": "2026-09-17T15:30:00Z"
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{ "email": "fan@example.com", "password": "hunter2-but-better" }'`,
              },
              {
                label: "JavaScript",
                language: "javascript",
                code: `const { data } = await fetch("http://localhost:8080/api/v1/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
}).then((r) => r.json())

const { access_token, refresh_token } = data`,
              },
            ],
          },
          {
            id: "auth-refresh",
            method: "POST",
            path: "/api/v1/auth/refresh",
            summary: "Refresh the token pair",
            description: "Exchanges a valid refresh token for a new access/refresh pair. The old refresh token is invalidated immediately.",
            params: [
              { name: "refresh_token", type: "string", in: "body", required: true, description: "" },
            ],
            responseExample: `{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_at": "2026-09-17T16:30:00Z"
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{ "refresh_token": "'"$REFRESH_TOKEN"'" }'`,
              },
            ],
          },
          {
            id: "auth-logout",
            method: "POST",
            path: "/api/v1/auth/logout",
            summary: "Log out",
            description: "Invalidates the given refresh token server-side.",
            params: [
              { name: "refresh_token", type: "string", in: "body", required: true, description: "" },
            ],
            responseExample: `{
  "data": { "success": true }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/auth/logout \\
  -H "Content-Type: application/json" \\
  -d '{ "refresh_token": "'"$REFRESH_TOKEN"'" }'`,
              },
            ],
          },
          {
            id: "auth-me",
            method: "GET",
            path: "/api/v1/me",
            summary: "Current user",
            description: "Returns the identity embedded in the access token.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "Bearer <access_token>" },
            ],
            responseExample: `{
  "data": {
    "id": "usr_2f1a9c",
    "email": "fan@example.com",
    "role": "fan",
    "tenant_id": "ten_9e2b4f"
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl http://localhost:8080/api/v1/me \\
  -H "Authorization: Bearer $TOKEN"`,
              },
            ],
          },
        ],
      },
      {
        name: "Admin Bootstrap",
        description: "Shared-secret, not JWT. This is the only way to create the first admin for a tenant — every other admin action requires an admin JWT.",
        endpoints: [
          {
            id: "admin-bootstrap",
            method: "POST",
            path: "/api/v1/admin/bootstrap",
            summary: "Create the first admin for a tenant",
            description: "Requires the ADMIN_BOOTSTRAP_SECRET configured in .env, not a token. Run this once per tenant, right after seeding it.",
            params: [
              { name: "X-Bootstrap-Secret", type: "string", in: "header", required: true, description: "Must match ADMIN_BOOTSTRAP_SECRET" },
              { name: "tenant_id", type: "string", in: "body", required: true, description: "From the tenant you seeded via SQL" },
              { name: "email", type: "string", in: "body", required: true, description: "" },
              { name: "password", type: "string", in: "body", required: true, description: "" },
              { name: "first_name", type: "string", in: "body", required: true, description: "" },
              { name: "last_name", type: "string", in: "body", required: true, description: "" },
            ],
            responseExample: `{
  "data": {
    "id": "usr_admin_1a2b",
    "email": "admin@my-club.local",
    "role": "admin",
    "tenant_id": "ten_9e2b4f"
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/admin/bootstrap \\
  -H "X-Bootstrap-Secret: $ADMIN_BOOTSTRAP_SECRET" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tenant_id": "ten_9e2b4f",
    "email": "admin@my-club.local",
    "password": "change-me-locally",
    "first_name": "Site",
    "last_name": "Admin"
  }'`,
              },
            ],
          },
        ],
      },
      {
        name: "Admin — Venues & Events",
        description: "All require an admin JWT (from logging in as the bootstrapped admin). Tenant scope comes from the token — there's no tenant field or header to set here.",
        endpoints: [
          {
            id: "admin-create-venue",
            method: "POST",
            path: "/api/v1/admin/venues",
            summary: "Create a venue",
            description: "",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "Bearer <admin_access_token>" },
              { name: "name", type: "string", in: "body", required: true, description: "" },
              { name: "address", type: "string", in: "body", required: true, description: "" },
              { name: "city", type: "string", in: "body", required: true, description: "" },
              { name: "country", type: "string", in: "body", required: true, description: "" },
              { name: "timezone", type: "string", in: "body", required: true, description: "IANA timezone, e.g. Europe/London" },
              { name: "capacity", type: "integer", in: "body", required: true, description: "" },
            ],
            responseExample: `{
  "data": {
    "id": "ven_1a2b3c",
    "name": "My Club Stadium",
    "capacity": 45000
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/admin/venues \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Club Stadium",
    "address": "1 Stadium Way",
    "city": "Manchester",
    "country": "UK",
    "timezone": "Europe/London",
    "capacity": 45000
  }'`,
              },
            ],
          },
          {
            id: "admin-list-venues",
            method: "GET",
            path: "/api/v1/admin/venues",
            summary: "List venues",
            description: "",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "Bearer <admin_access_token>" },
            ],
            responseExample: `{
  "data": [
    { "id": "ven_1a2b3c", "name": "My Club Stadium", "capacity": 45000 }
  ]
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl http://localhost:8080/api/v1/admin/venues \\
  -H "Authorization: Bearer $ADMIN_TOKEN"`,
              },
            ],
          },
          {
            id: "admin-create-seat-category",
            method: "POST",
            path: "/api/v1/admin/seat-categories",
            summary: "Create a seat category",
            description: "A reusable label (e.g. \"North Stand\") that ticket categories attach to per event.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "Bearer <admin_access_token>" },
              { name: "name", type: "string", in: "body", required: true, description: "" },
              { name: "color", type: "string", in: "body", required: true, description: "Hex color used in seat-map UIs" },
            ],
            responseExample: `{
  "data": { "id": "cat_north_stand", "name": "North Stand", "color": "#3b82f6" }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/admin/seat-categories \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "North Stand", "color": "#3b82f6" }'`,
              },
            ],
          },
          {
            id: "admin-create-event",
            method: "POST",
            path: "/api/v1/admin/events",
            summary: "Create an event",
            description: "Creates the event shell. No inventory exists until a ticket category is published against it.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "Bearer <admin_access_token>" },
              { name: "venue_id", type: "string", in: "body", required: true, description: "" },
              { name: "name", type: "string", in: "body", required: true, description: "" },
              { name: "home_team", type: "string", in: "body", required: true, description: "" },
              { name: "away_team", type: "string", in: "body", required: true, description: "" },
              { name: "starts_at", type: "string (RFC3339)", in: "body", required: true, description: "" },
              { name: "sales_start_at", type: "string (RFC3339)", in: "body", required: true, description: "" },
              { name: "sales_end_at", type: "string (RFC3339)", in: "body", required: true, description: "" },
            ],
            responseExample: `{
  "data": {
    "id": "evt_7f3a9c",
    "name": "My Club vs Visitors FC",
    "status": "draft"
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/admin/events \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "venue_id": "ven_1a2b3c",
    "name": "My Club vs Visitors FC",
    "home_team": "My Club",
    "away_team": "Visitors FC",
    "starts_at": "2026-11-01T15:00:00Z",
    "sales_start_at": "2026-10-01T09:00:00Z",
    "sales_end_at": "2026-11-01T13:00:00Z"
  }'`,
              },
            ],
          },
          {
            id: "admin-create-ticket-category",
            method: "POST",
            path: "/api/v1/admin/events/{eventID}/ticket-categories",
            summary: "Attach a ticket category to an event",
            description: "Links a seat category to this event with a price. Still no purchasable inventory until published.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "Bearer <admin_access_token>" },
              { name: "eventID", type: "string", in: "path", required: true, description: "" },
              { name: "seat_category_id", type: "string", in: "body", required: true, description: "" },
              { name: "price_cents", type: "integer", in: "body", required: true, description: "" },
              { name: "currency", type: "string", in: "body", required: true, description: "ISO 4217, e.g. GBP" },
              { name: "max_per_order", type: "integer", in: "body", required: true, description: "" },
            ],
            responseExample: `{
  "data": {
    "id": "etc_4c8e2d",
    "seat_category_id": "cat_north_stand",
    "price_cents": 4500,
    "currency": "GBP"
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/admin/events/evt_7f3a9c/ticket-categories \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "seat_category_id": "cat_north_stand",
    "price_cents": 4500,
    "currency": "GBP",
    "max_per_order": 6
  }'`,
              },
            ],
          },
          {
            id: "admin-publish-event",
            method: "POST",
            path: "/api/v1/admin/events/{eventID}/publish",
            summary: "Publish inventory and flip the event on sale",
            description: "Generates the actual purchasable inventory rows for a ticket category and moves the event to on_sale.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "Bearer <admin_access_token>" },
              { name: "eventID", type: "string", in: "path", required: true, description: "" },
              { name: "event_ticket_category_id", type: "string", in: "body", required: true, description: "" },
              { name: "quantity", type: "integer", in: "body", required: true, description: "How many GA units to generate" },
            ],
            responseExample: `{
  "data": {
    "event_id": "evt_7f3a9c",
    "status": "on_sale",
    "generated": 500
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/admin/events/evt_7f3a9c/publish \\
  -H "Authorization: Bearer $ADMIN_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "event_ticket_category_id": "etc_4c8e2d", "quantity": 500 }'`,
              },
            ],
          },
        ],
      },
      {
        name: "Fan — Browsing",
        description: "Public — no JWT required, but every request needs X-Tenant-ID since there's no token yet to carry tenant scope.",
        endpoints: [
          {
            id: "list-events",
            method: "GET",
            path: "/api/v1/events",
            summary: "List events",
            description: "Returns events for the given tenant.",
            params: [
              { name: "X-Tenant-ID", type: "string", in: "header", required: true, description: "" },
            ],
            responseExample: `{
  "data": [
    {
      "id": "evt_7f3a9c",
      "name": "My Club vs Visitors FC",
      "status": "on_sale",
      "starts_at": "2026-11-01T15:00:00Z"
    }
  ]
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl http://localhost:8080/api/v1/events \\
  -H "X-Tenant-ID: $TENANT_ID"`,
              },
            ],
          },
          {
            id: "get-event",
            method: "GET",
            path: "/api/v1/events/{id}",
            summary: "Get event details",
            description: "Includes ticket categories and live available counts.",
            params: [
              { name: "X-Tenant-ID", type: "string", in: "header", required: true, description: "" },
              { name: "id", type: "string", in: "path", required: true, description: "" },
            ],
            responseExample: `{
  "data": {
    "id": "evt_7f3a9c",
    "name": "My Club vs Visitors FC",
    "status": "on_sale",
    "ticket_categories": [
      { "id": "etc_4c8e2d", "name": "North Stand", "price_cents": 4500, "available": 487 }
    ]
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl http://localhost:8080/api/v1/events/evt_7f3a9c \\
  -H "X-Tenant-ID: $TENANT_ID"`,
              },
            ],
          },
        ],
      },
      {
        name: "Fan — Waiting Room",
        description: "Bearer token + X-Tenant-ID both required. Admission happens automatically via cmd/worker within a few seconds — there is no HTTP route to admit yourself.",
        endpoints: [
          {
            id: "join-queue",
            method: "POST",
            path: "/api/v1/events/{eventID}/queue",
            summary: "Join the waiting room",
            description: "",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "" },
              { name: "X-Tenant-ID", type: "string", in: "header", required: true, description: "" },
              { name: "eventID", type: "string", in: "path", required: true, description: "" },
            ],
            responseExample: `{
  "data": { "admitted": false, "position": 42 }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/events/evt_7f3a9c/queue \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Tenant-ID: $TENANT_ID"`,
              },
            ],
          },
          {
            id: "get-queue",
            method: "GET",
            path: "/api/v1/events/{eventID}/queue",
            summary: "Check queue status",
            description: "Poll until admitted is true — make sure cmd/worker is running in a second terminal, or this never flips.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "" },
              { name: "X-Tenant-ID", type: "string", in: "header", required: true, description: "" },
              { name: "eventID", type: "string", in: "path", required: true, description: "" },
            ],
            responseExample: `{
  "data": { "admitted": true, "position": 0 }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl http://localhost:8080/api/v1/events/evt_7f3a9c/queue \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Tenant-ID: $TENANT_ID"`,
              },
            ],
          },
        ],
      },
      {
        name: "Fan — Inventory & Holds",
        description: "Bearer token + X-Tenant-ID both required. Requires admitted: true from the queue above.",
        endpoints: [
          {
            id: "hold-inventory",
            method: "POST",
            path: "/api/v1/inventory/{id}/hold",
            summary: "Hold an inventory unit",
            description: "Reserves it for a short TTL. Grab the id from GET /events/{id} in local testing.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "" },
              { name: "X-Tenant-ID", type: "string", in: "header", required: true, description: "" },
              { name: "id", type: "string", in: "path", required: true, description: "Inventory unit id" },
              { name: "event_id", type: "string", in: "body", required: true, description: "" },
            ],
            responseExample: `{
  "data": { "hold_token": "hld_9e2b4f", "expires_at": "2026-09-17T15:38:00Z" }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/inventory/inv_1a2b/hold \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Tenant-ID: $TENANT_ID" \\
  -H "Content-Type: application/json" \\
  -d '{ "event_id": "evt_7f3a9c" }'`,
              },
            ],
          },
          {
            id: "release-inventory",
            method: "POST",
            path: "/api/v1/inventory/{id}/release",
            summary: "Release a hold early",
            description: "Returns the unit to available inventory before its TTL expires naturally.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "" },
              { name: "X-Tenant-ID", type: "string", in: "header", required: true, description: "" },
              { name: "id", type: "string", in: "path", required: true, description: "" },
              { name: "hold_token", type: "string", in: "body", required: true, description: "" },
            ],
            responseExample: `{
  "data": { "released": true }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/inventory/inv_1a2b/release \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Tenant-ID: $TENANT_ID" \\
  -H "Content-Type: application/json" \\
  -d '{ "hold_token": "hld_9e2b4f" }'`,
              },
            ],
          },
        ],
      },
      {
        name: "Fan — Orders",
        description: "Bearer token + X-Tenant-ID both required. Confirming payment happens via the Stripe webhook below, not a client-facing endpoint.",
        endpoints: [
          {
            id: "create-order",
            method: "POST",
            path: "/api/v1/orders",
            summary: "Create an order from active holds",
            description: "idempotency_key makes retries safe. Each item references an inventory_id + the hold_token that reserved it.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "" },
              { name: "X-Tenant-ID", type: "string", in: "header", required: true, description: "" },
              { name: "idempotency_key", type: "string", in: "body", required: true, description: "" },
              { name: "items", type: "array", in: "body", required: true, description: "[{ inventory_id, hold_token }]" },
            ],
            responseExample: `{
  "data": {
    "id": "ord_4c8e2d",
    "status": "pending_payment",
    "total_cents": 4500
  }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/orders \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Tenant-ID: $TENANT_ID" \\
  -H "Content-Type: application/json" \\
  -d '{
    "idempotency_key": "'"$(uuidgen)"'",
    "items": [{ "inventory_id": "inv_1a2b", "hold_token": "hld_9e2b4f" }]
  }'`,
              },
            ],
          },
          {
            id: "authorize-order",
            method: "POST",
            path: "/api/v1/orders/{id}/authorize",
            summary: "Authorize payment",
            description: "In mock mode (STRIPE_SECRET_KEY unset) this returns a deterministic client_secret rather than calling Stripe.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "" },
              { name: "X-Tenant-ID", type: "string", in: "header", required: true, description: "" },
              { name: "id", type: "string", in: "path", required: true, description: "" },
            ],
            responseExample: `{
  "data": { "client_secret": "pi_mock_3Nq_secret_abc123" }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/api/v1/orders/ord_4c8e2d/authorize \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Tenant-ID: $TENANT_ID"`,
              },
            ],
          },
          {
            id: "list-orders",
            method: "GET",
            path: "/api/v1/orders",
            summary: "List your own orders",
            description: "",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "" },
              { name: "X-Tenant-ID", type: "string", in: "header", required: true, description: "" },
            ],
            responseExample: `{
  "data": [
    { "id": "ord_4c8e2d", "status": "paid", "total_cents": 4500 }
  ]
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl http://localhost:8080/api/v1/orders \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Tenant-ID: $TENANT_ID"`,
              },
            ],
          },
          {
            id: "get-order",
            method: "GET",
            path: "/api/v1/orders/{id}",
            summary: "Get a single order",
            description: "Check status: paid here after firing the webhook below.",
            params: [
              { name: "Authorization", type: "string", in: "header", required: true, description: "" },
              { name: "X-Tenant-ID", type: "string", in: "header", required: true, description: "" },
              { name: "id", type: "string", in: "path", required: true, description: "" },
            ],
            responseExample: `{
  "data": { "id": "ord_4c8e2d", "status": "paid", "total_cents": 4500 }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl http://localhost:8080/api/v1/orders/ord_4c8e2d \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "X-Tenant-ID: $TENANT_ID"`,
              },
            ],
          },
        ],
      },
      {
        name: "Webhooks",
        description: "No Bearer token — authenticated instead by a computed Stripe-Signature header. This is the call that actually flips an order to paid and enqueues its confirmation notification.",
        endpoints: [
          {
            id: "stripe-webhook",
            method: "POST",
            path: "/webhooks/stripe",
            summary: "Stripe payment webhook",
            description: "In mock mode the signature is hex(HMAC-SHA256(raw_body, STRIPE_WEBHOOK_SECRET)) — no timestamp prefix, unlike real Stripe's t=...,v1=... format. Compute it outside Postman with openssl, or with a pre-request script.",
            params: [
              { name: "Stripe-Signature", type: "string", in: "header", required: true, description: "hex(HMAC-SHA256(raw_body, STRIPE_WEBHOOK_SECRET))" },
            ],
            responseExample: `{
  "data": { "received": true }
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `BODY='{"type":"payment_intent.succeeded","data":{"object":{"id":"pi_mock_3Nq"}}}'
SIG=$(openssl dgst -sha256 -hmac "$STRIPE_WEBHOOK_SECRET" <<< "$BODY" | sed 's/^.* //')

curl -X POST http://localhost:8080/webhooks/stripe \\
  -H "Stripe-Signature: $SIG" \\
  -H "Content-Type: application/json" \\
  -d "$BODY"`,
              },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // Job Scheduler (real project — local only, no hosted deployment)
  // ─────────────────────────────────────────────────────────────
  {
    slug: "job-scheduler",
    name: "Job Scheduler",
    tagline: "Distributed one-off & recurring job scheduler",
    description:
      "A distributed job scheduler in Go: an HTTP API that persists jobs to MongoDB, an etcd-elected scheduler that claims due work and publishes it to Kafka, per-job-type executors with retry/backoff and a dead-letter queue, and a reaper that recovers stuck jobs. Supports one-off and cron-recurring jobs. Runs entirely on localhost — no hosted environment.",
    baseUrl: "http://localhost:8080",
    auth: {
      type: "None",
      header: "—",
      description:
        "The API has no authentication. Tenant scope is a plain tenantId field — in the request body when creating a job and in the query string when listing — and is not verified against any identity. That's fine for a local, single-operator setup but means the API must sit behind a gateway or auth layer before being exposed anywhere. Errors are returned as { \"error\": \"message\" } with a matching HTTP status; successful responses are the raw resource, with no data envelope.",
    },
        githubUrl: "https://github.com/gavinarori/high-scale-job-scheduler",
    architecture: {
      intro:
        "Five small binaries share one config package and one Mongo-backed repository. cmd/api accepts jobs, cmd/scheduler claims due jobs and publishes them, cmd/executor consumes them and runs handlers, cmd/reaper recovers anything that gets stuck, and cmd/seed / cmd/loadtest are tooling. Each job's lifecycle is a status field in Mongo; Kafka only carries a small wake-up message, never the payload.",
      sections: [
        {
          heading: "Job lifecycle",
          body: "Every job is one document in the jobs collection and moves through a fixed set of statuses. Mongo is the single source of truth — Kafka and etcd hold no job state.",
          bullets: [
            "pending → queued: the scheduler atomically claims a due job (scheduledAt <= now) with findOneAndUpdate, highest priority first, then oldest scheduledAt",
            "queued → claimed → running: the executor marks the job as it picks up the Kafka message and starts the handler",
            "running → completed on success; on failure → pending again with a pushed-out scheduledAt, or → dlq once attempts reach maxAttempts",
            "A failed status is defined in the model but never written — a failed attempt goes straight back to pending or on to dlq",
          ],
        },
        {
          heading: "Scheduler & leader election",
          body: "Any number of scheduler instances can run, but only one dispatches at a time.",
          bullets: [
            "Instances campaign via etcd's concurrency election (10s lease TTL). Standbys block until the leader's session dies, then etcd resolves a new leader through Raft",
            "If a leader's session ends mid-run, its loop context is cancelled so it stops dispatching rather than trusting its own belief that it's still leading",
            "The loop ticks every SCHEDULER_TICK (default 500ms) and claims up to 20 jobs per tick",
            "Claiming is a single-document atomic update, so even a handoff overlap between two instances can't double-claim a job",
          ],
        },
        {
          heading: "Dispatch & execution",
          body: "The scheduler publishes a tiny message to a per-job-type Kafka topic; the executor loads the full job from Mongo by ID.",
          bullets: [
            "Topic per type: jobs.dispatch.<jobType>. Messages carry only jobId, jobType, and priority, so payload size never affects Kafka",
            "One executor process per job type (JOB_TYPE), in consumer group executor-<jobType>, so a slow type's backlog can't starve a fast one and each scales independently",
            "Offsets are committed manually after the handler returns, and handlers run inline — a crashed executor's message is redelivered, and the reaper covers jobs left half-run",
            "Handlers are plain functions registered by name. Built in: noop, log-message, flaky (configurable failRate, exists to exercise retry/DLQ), and slow (configurable sleepMs)",
          ],
        },
        {
          heading: "Retries & dead-letter queue",
          body: "Retry state lives in the job document, not in a separate retry topic.",
          bullets: [
            "On failure the attempt counter increments and lastError is recorded",
            "Backoff is 2^attempt seconds, capped at 5 minutes — the job returns to pending with scheduledAt pushed out, and the scheduler picks it up again naturally",
            "Once attempts reach maxAttempts (default 3) the job's status becomes dlq, it is never claimed again, and a message is also published to the jobs.dlq Kafka topic for external inspection",
          ],
        },
        {
          heading: "Recurring (cron) jobs",
          body: "A cron job is a template that never runs itself — it only spawns instances.",
          bullets: [
            "Standard 5-field cron (minute hour dom month dow), no seconds field. The expression is validated at creation time, and the first scheduledAt is computed server-side",
            "When a template comes due, the scheduler inserts a normal one-off instance with key <template-key>-run-<unixnano> and no cron field, then reschedules the template to its next occurrence",
            "Retry history, idempotency, and DLQ state are therefore scoped to each individual run rather than the template",
            "A template whose expression can no longer be parsed (e.g. hand-edited in Mongo) is dead-lettered with the reason in lastError instead of silently halting",
          ],
        },
        {
          heading: "Reaper",
          body: "A background sweep every 30 seconds that returns stuck jobs to pending. Two sweeps, two timeouts.",
          bullets: [
            "queued longer than QUEUED_TIMEOUT (30s) — the scheduler claimed the job but its Kafka publish failed or never landed",
            "claimed / running longer than CLAIM_TIMEOUT (5m) — an executor crashed or hung mid-job",
            "Recoveries are counted in reaper_recovered_jobs_total{sweep}, so a rising rate is an early signal that Kafka or an executor is unhealthy",
          ],
        },
        {
          heading: "Observability",
          body: "Every binary serves Prometheus metrics and a health check on a separate listener from job traffic.",
          bullets: [
            "/metrics and /healthz on port 9100 (METRICS_PORT), so a scrape problem can't affect the job API and vice versa",
            "Scheduler: tick duration, jobs claimed, dispatch errors, cron instances spawned, invalid cron templates",
            "Executor: jobs processed per job_type and result, handler duration per job_type",
            "Consumer lag — what the Kubernetes KEDA ScaledObject scales executors on — comes from KEDA's own Kafka scaler, not from these metrics",
          ],
        },
      ],
      tradeoffs: [
        "Mongo is the source of truth and Kafka is only a wake-up signal — a lost or duplicated Kafka message can never lose a job, because the reaper re-pends anything stuck in queued, at the cost of up to QUEUED_TIMEOUT of added latency on that failure path",
        "Delivery is at-least-once: a job reclaimed by the reaper while its original executor is still running can execute twice, so handlers should be idempotent",
        "Retries reuse the scheduler's normal claim path (status back to pending with a later scheduledAt) instead of a delay-aware retry topic — simpler and fewer moving parts, but retry timing is only as fine-grained as the scheduler tick",
        "Claiming is one findOneAndUpdate per job (up to 20 per tick) rather than a bulk update — this keeps every claim atomic and priority-ordered at the cost of more round-trips per tick",
        "A single elected leader dispatches, so throughput is bounded by one scheduler's loop; extra instances buy failover, not scale",
        "The API is unauthenticated and tenantId is self-declared — acceptable for local development, but tenant isolation is a convention here, not an enforced boundary",
      ],
    },
    localSetup: {
      intro:
        "Everything below runs against localhost. The Docker Compose stack starts every dependency and service at once — etcd, Kafka, a single-node Mongo replica set, the API, two scheduler instances, one executor per job type, the reaper, Prometheus, and Grafana.",
      steps: [
        {
          title: "Start the full stack",
          description:
            "Builds and starts everything. Mongo runs as a single-node replica set because transactions require one. The API listens on :8080, Prometheus on :9090, and Grafana on :3000 (anonymous admin, local only).",
          command: "docker compose -f deployments/docker/docker-compose.yml up --build",
        },
        {
          title: "Or run just the API against hosted Mongo",
          description:
            "Alternative to Docker for the Mongo side: copy the example env file and set MONGO_URI (e.g. an Atlas mongodb+srv:// string — drop any ?replicaSet= param). cmd/api needs only Mongo; running the scheduler and executor this way also needs Kafka and etcd reachable via KAFKA_BROKERS and ETCD_ENDPOINTS.",
          command: "cp .env.example .env && go run ./cmd/api",
        },
        {
          title: "Verify",
          description:
            "Confirms the API is up. The per-binary /metrics and /healthz on port 9100 aren't published to the host by Compose — Prometheus scrapes them over the Docker network.",
          command: "curl localhost:8080/healthz",
        },
        {
          title: "Create a job",
          description:
            "Submit a one-off job scheduled for a time in the past or near future. Within one scheduler tick it is claimed, published to jobs.dispatch.log-message, run by executor-log-message, and marked completed. See Create a job below for the full request.",
        },
        {
          title: "Seed demo data (optional)",
          description:
            "Inserts a realistic mix directly into Mongo — immediate and future one-off jobs, a fraction using the flaky handler so retries and the DLQ have entries, some slow jobs, and a few cron templates across tenants. The fastest way to see every code path exercised.",
          command: "docker compose -f deployments/docker/docker-compose.yml run --rm seed -count 500",
        },
        {
          title: "Load test the running stack (optional)",
          description:
            "Sends jobs at a target rate over HTTP, then polls each until it reaches completed or dlq, reporting ack latency and end-to-end p50/p95/p99. Needs the full stack running, not just Mongo.",
          command: "go run ./cmd/loadtest -rate 20 -duration 30s",
        },
        {
          title: "Run the tests",
          description:
            "Integration tests run against a real Mongo replica set started by testcontainers (Docker required) and cover idempotency, claim concurrency, retry/DLQ, reaper recovery, and cron. Load benchmarks are separate.",
          command: "go test ./test/integration/... -v",
        },
      ],
    },
    groups: [
      {
        name: "Health & Status",
        description: "No auth required. Liveness only.",
        endpoints: [
          {
            id: "healthz",
            method: "GET",
            path: "/healthz",
            summary: "API liveness probe",
            description:
              "Returns 200 with a plain-text body. It does not check Mongo. Each binary also serves its own /healthz and /metrics on port 9100.",
            responseExample: `ok`,
            codeSamples: [
              { label: "cURL", language: "bash", code: `curl http://localhost:8080/healthz` },
            ],
          },
        ],
      },
      {
        name: "Jobs",
        description:
          "Create, fetch, and list jobs. Jobs are processed asynchronously — a 201 means the job is stored as pending, not that it has run. Poll GET /jobs/{id} for status.",
        endpoints: [
          {
            id: "create-job",
            method: "POST",
            path: "/jobs",
            summary: "Create a one-off job",
            description:
              "Stores a job in pending status. Once scheduledAt is due, the scheduler claims it and it runs on the executor for its jobType. idempotencyKey is unique across all jobs; reusing one returns 409 rather than creating a duplicate, which makes client retries safe. Higher priority values are claimed first. maxAttempts defaults to 3 if omitted or not positive.",
            params: [
              { name: "idempotencyKey", type: "string", in: "body", required: true, description: "Globally unique. Duplicate → 409 Conflict" },
              { name: "tenantId", type: "string", in: "body", required: true, description: "Groups jobs for listing; not authenticated" },
              { name: "jobType", type: "string", in: "body", required: true, description: "Selects the handler and Kafka topic: noop, log-message, flaky, or slow" },
              { name: "scheduledAt", type: "string (RFC3339)", in: "body", required: true, description: "When the job becomes due. A past time runs on the next tick. Required unless cron is set" },
              { name: "payload", type: "object", in: "body", required: false, description: "Arbitrary JSON passed to the handler. log-message needs message; flaky takes failRate; slow takes sleepMs" },
              { name: "priority", type: "integer", in: "body", required: false, description: "Higher runs first among due jobs. Defaults to 0" },
              { name: "maxAttempts", type: "integer", in: "body", required: false, description: "Total tries before the job goes to the DLQ. Defaults to 3" },
            ],
            responseExample: `{
  "id": "66f9a1c2e4b0a3d5c8f12a01",
  "idempotencyKey": "test-job-1",
  "tenantId": "tenant-a",
  "jobType": "log-message",
  "payload": { "message": "hello from the scheduler" },
  "priority": 5,
  "status": "pending",
  "scheduledAt": "2026-09-29T18:00:00Z",
  "attempts": 0,
  "maxAttempts": 3,
  "createdAt": "2026-09-29T18:00:00Z",
  "updatedAt": "2026-09-29T18:00:00Z"
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/jobs \\
  -H "Content-Type: application/json" \\
  -d '{
    "idempotencyKey": "test-job-1",
    "tenantId": "tenant-a",
    "jobType": "log-message",
    "payload": { "message": "hello from the scheduler" },
    "priority": 5,
    "scheduledAt": "2026-09-29T18:00:00Z",
    "maxAttempts": 3
  }'`,
              },
              {
                label: "JavaScript",
                language: "javascript",
                code: `const res = await fetch("http://localhost:8080/jobs", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    idempotencyKey: crypto.randomUUID(),
    tenantId: "tenant-a",
    jobType: "log-message",
    payload: { message: "hello from the scheduler" },
    scheduledAt: new Date().toISOString(),
  }),
})

if (res.status === 409) console.log("already exists")
const job = await res.json()`,
              },
            ],
          },
          {
            id: "create-recurring-job",
            method: "POST",
            path: "/jobs",
            summary: "Create a recurring (cron) job",
            description:
              "Pass cron instead of scheduledAt. The expression is validated on creation (400 if invalid) and the first scheduledAt is computed for you. The returned job is a template: it never runs itself. Each firing spawns a separate one-off job with idempotency key <idempotencyKey>-run-<timestamp>, then the template moves to its next occurrence. Standard 5-field cron only — no seconds field.",
            params: [
              { name: "idempotencyKey", type: "string", in: "body", required: true, description: "Identifies the template; spawned runs derive their keys from it" },
              { name: "tenantId", type: "string", in: "body", required: true, description: "" },
              { name: "jobType", type: "string", in: "body", required: true, description: "" },
              { name: "cron", type: "string", in: "body", required: true, description: "5-field expression, e.g. \"0 2 * * *\" for 02:00 daily (UTC)" },
              { name: "payload", type: "object", in: "body", required: false, description: "Copied to every spawned run" },
              { name: "priority", type: "integer", in: "body", required: false, description: "Copied to every spawned run" },
              { name: "maxAttempts", type: "integer", in: "body", required: false, description: "Applies to each spawned run. Defaults to 3" },
            ],
            responseExample: `{
  "id": "66f9a1c2e4b0a3d5c8f12a02",
  "idempotencyKey": "nightly-report",
  "tenantId": "tenant-a",
  "jobType": "log-message",
  "payload": { "message": "nightly report run" },
  "priority": 0,
  "status": "pending",
  "scheduledAt": "2026-09-30T02:00:00Z",
  "cron": "0 2 * * *",
  "attempts": 0,
  "maxAttempts": 3,
  "createdAt": "2026-09-29T18:00:00Z",
  "updatedAt": "2026-09-29T18:00:00Z"
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl -X POST http://localhost:8080/jobs \\
  -H "Content-Type: application/json" \\
  -d '{
    "idempotencyKey": "nightly-report",
    "tenantId": "tenant-a",
    "jobType": "log-message",
    "payload": { "message": "nightly report run" },
    "cron": "0 2 * * *",
    "maxAttempts": 3
  }'`,
              },
            ],
          },
          {
            id: "get-job",
            method: "GET",
            path: "/jobs/{id}",
            summary: "Get a job",
            description:
              "Returns the current state of one job. Use it to follow a job through pending → queued → claimed → running → completed (or back to pending with an incremented attempts on failure, or dlq once retries are exhausted). claimedBy and claimedAt appear once an executor picks it up; lastError appears after a failure. A malformed id returns 400; an unknown one returns 404.",
            params: [
              { name: "id", type: "string", in: "path", required: true, description: "Job id (24-character hex ObjectID) returned on creation" },
            ],
            responseExample: `{
  "id": "66f9a1c2e4b0a3d5c8f12a01",
  "idempotencyKey": "test-job-1",
  "tenantId": "tenant-a",
  "jobType": "log-message",
  "payload": { "message": "hello from the scheduler" },
  "priority": 5,
  "status": "completed",
  "scheduledAt": "2026-09-29T18:00:00Z",
  "claimedBy": "worker-3k9x",
  "claimedAt": "2026-09-29T18:00:00Z",
  "attempts": 0,
  "maxAttempts": 3,
  "createdAt": "2026-09-29T18:00:00Z",
  "updatedAt": "2026-09-29T18:00:01Z"
}`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `curl http://localhost:8080/jobs/66f9a1c2e4b0a3d5c8f12a01`,
              },
              {
                label: "JavaScript",
                language: "javascript",
                code: `// Poll until the job reaches a terminal state
let job
do {
  await new Promise((r) => setTimeout(r, 500))
  job = await fetch(\`http://localhost:8080/jobs/\${id}\`).then((r) => r.json())
} while (!["completed", "dlq"].includes(job.status))`,
              },
            ],
          },
          {
            id: "list-jobs",
            method: "GET",
            path: "/jobs",
            summary: "List jobs for a tenant",
            description:
              "Returns a tenant's jobs newest first (by createdAt), as a bare JSON array. tenantId is required (400 without it). limit defaults to 100 and is capped at 5000; an invalid or non-positive limit silently falls back to the default. Recurring templates and their spawned runs both appear here.",
            params: [
              { name: "tenantId", type: "string", in: "query", required: true, description: "" },
              { name: "status", type: "string", in: "query", required: false, description: "Filter: pending, queued, claimed, running, completed, or dlq" },
              { name: "limit", type: "integer", in: "query", required: false, description: "Max results. Default 100, max 5000" },
            ],
            responseExample: `[
  {
    "id": "66f9a1c2e4b0a3d5c8f12a01",
    "idempotencyKey": "test-job-1",
    "tenantId": "tenant-a",
    "jobType": "log-message",
    "payload": { "message": "hello from the scheduler" },
    "priority": 5,
    "status": "completed",
    "scheduledAt": "2026-09-29T18:00:00Z",
    "attempts": 0,
    "maxAttempts": 3,
    "createdAt": "2026-09-29T18:00:00Z",
    "updatedAt": "2026-09-29T18:00:01Z"
  }
]`,
            codeSamples: [
              {
                label: "cURL",
                language: "bash",
                code: `# All jobs for a tenant
curl "http://localhost:8080/jobs?tenantId=tenant-a"

# Only dead-lettered jobs, capped at 50
curl "http://localhost:8080/jobs?tenantId=tenant-a&status=dlq&limit=50"`,
              },
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