import { Fragment } from 'react'

type Props = {
  children: React.ReactNode
}

const AuthRootLayout = ({ children }: Props) => {
  return <Fragment>{children}</Fragment>
}

export default AuthRootLayout
