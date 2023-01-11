import { MethodType, RegisterFields, SignInFields, UrlType } from './typings'
import { User } from '@prisma/client'
import { Method, Url } from '@lib/constants'

type Params<T = {}> = {
  url: UrlType
  method: MethodType
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

  return json ? await res.json() : res
}

export const register = async (user: Pick<User, RegisterFields>) => {
  return fetcher({
    url: Url.Register,
    method: Method.POST,
    body: user,
    json: false,
  })
}

export const signin = async (user: Pick<User, SignInFields>) => {
  return fetcher({
    url: Url.Register,
    method: Method.POST,
    body: user,
    json: false,
  })
}
