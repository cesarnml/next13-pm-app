import { Links } from './typings'

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
  Calendar: '/calendar',
  Logout: '/logout',
  Register: '/register',
  Profile: '/profile',
  Project: (id: string) => `/project/${id}`,
  Settings: '/settings',
  SignIn: '/signin',
  Static: '/static',
} as const

export const links: Links = [
  { label: 'Home', icon: 'Grid', href: Route.Root },
  {
    label: 'Calendar',
    icon: 'Calendar',
    href: Route.Calendar,
  },
  { label: 'Profile', icon: 'User', href: Route.Profile },
  {
    label: 'Settings',
    icon: 'Settings',
    href: Route.Settings,
  },
]
