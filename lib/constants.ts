import { Links } from './typings'

export const links: Links = [
  { label: 'Home', icon: 'Grid', href: '/home' },
  {
    label: 'Calendar',
    icon: 'Calendar',
    href: '/calendar',
  },
  { label: 'Profile', icon: 'User', href: '/profile' },
  {
    label: 'Settings',
    icon: 'Settings',
    href: '/settings',
  },
]

export const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
} as const

export const Url = {
  Register: '/api/register',
  SignIn: '/api/signin',
  Logout: '/api/logout',
} as const

export const Route = {
  Root: '/',
  Home: '/home',
  Register: '/register',
  SignIn: '/signin',
  Logout: '/logout',
} as const
