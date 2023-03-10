import { HttpMethod, Route, Url } from './constants'

export type LinkType = {
  label: string
  icon: string
  href: string
}

export type Links = LinkType[]

export type MethodType = typeof HttpMethod[keyof typeof HttpMethod]

export type UrlType = typeof Url[keyof typeof Url]

export type RouteType = typeof Route[keyof typeof Route]

export type RegisterFields = 'email' | 'password' | 'firstName' | 'lastName'

export type SignInFields = 'email' | 'password'
