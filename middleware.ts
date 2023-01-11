import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { Route } from '@lib/constants'
const PUBLIC_FILE = /\.(.*)$/

// had to make this again here as the other one is in a file with bcrypt which is not supported on edge runtime
const verifyJWT = async (jwt: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const { payload } = await jwtVerify(jwt, secret)

  return payload
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (
    pathname.startsWith(Route._Next) ||
    pathname.startsWith(Route.Api) ||
    pathname.startsWith(Route.Static) ||
    pathname.startsWith(Route.SignIn) ||
    pathname.startsWith(Route.Register) ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME)

  if (!jwt) {
    req.nextUrl.pathname = Route.SignIn
    return NextResponse.redirect(req.nextUrl)
  }

  try {
    await verifyJWT(jwt.value)
    return NextResponse.next()
  } catch (e) {
    console.error(e)
    req.nextUrl.pathname = Route.SignIn
    return NextResponse.redirect(req.nextUrl)
  }
}
