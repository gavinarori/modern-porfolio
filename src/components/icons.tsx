"use client"

import {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Mail,
  Globe,
  Coffee,
} from "lucide-react"
import type { LucideProps } from "lucide-react"
import React from "react"

type IconComponent = React.ComponentType<LucideProps>

export const Icons: Record<string, IconComponent> = {
  github: (props) => <Github {...props} />,
  linkedin: (props) => <Linkedin {...props} />,
  x: (props) => <Twitter {...props} />, // fallback to Twitter icon for X
  youtube: (props) => <Youtube {...props} />,
  email: (props) => <Mail {...props} />,
  globe: (props) => <Globe {...props} />,
  buyMeACoffee: (props) => <Coffee {...props} />,
}

export default Icons


