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
  _Next: '/_next',
  Api: '/api',
  Root: '/',
  Home: '/home',
  Calendar: '/calendar',
  Logout: '/logout',
  Register: '/register',
  Profile: '/profile',
  Settings: '/settings',
  SignIn: '/signin',
  Static: '/static',
} as const
