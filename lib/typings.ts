import { Method, Url } from './constants'

export type LinkType = {
  label: string
  icon: string
  href: string
}

export type Links = LinkType[]

export type MethodType = typeof Method[keyof typeof Method]

export type UrlType = typeof Url[keyof typeof Url]

export type RegisterFields = 'email' | 'password' | 'firstName' | 'lastName'

export type SignInFields = 'email' | 'password'
