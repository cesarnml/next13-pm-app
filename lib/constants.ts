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

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
} as const

export const Url = {
  CreateProject: '/api/project',
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
  Project: (id: string) => `/project/${id}`,
  Settings: '/settings',
  SignIn: '/signin',
  Static: '/static',
} as const
