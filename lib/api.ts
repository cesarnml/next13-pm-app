import { User } from '@prisma/client'

type Params<T = {}> = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH'
  body: T
  json: boolean
}

const fetcher = async ({ url, method, body, json = true }: Params) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('API Error')
  }

  if (json) {
    const data = await res.json()
    return data
  }
}

export const register = async (user: Partial<User>) => {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: false,
  })
}

export const signin = async (user: Partial<User>) => {
  return fetcher({
    url: '/api/signin',
    method: 'POST',
    body: user,
    json: false,
  })
}
