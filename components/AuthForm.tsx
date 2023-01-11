'use client'
import { register, signin } from '@lib/api'
import { FormEvent, useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Card from './Card'
import Button from './Button'
import Input from './Input'
import { Route } from '@lib/constants'

const registerContent = {
  linkUrl: Route.SignIn,
  linkText: 'Already have an account?',
  header: 'Create a new Account',
  subheader: 'Just a few things to get started',
  buttonText: 'Register',
}

const signinContent = {
  linkUrl: Route.Register,
  linkText: "Don't have an account?",
  header: 'Welcome Back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
}

const initial = { email: '', password: '', firstName: '', lastName: '' }

type Props = {
  mode: 'register' | 'signin'
}

export default function AuthForm({ mode }: Props) {
  const [formState, setFormState] = useState(initial)
  const [error, setError] = useState('')

  const { firstName, lastName, email, password } = formState

  const router = useRouter()
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        if (mode === 'register') {
          await register({ firstName, lastName, email, password })
        } else {
          await signin({ email, password })
        }
        router.replace(Route.Home)
      } catch (e) {
        setError(`Could not ${mode}`)
      } finally {
        setFormState(initial)
      }
    },
    [email, firstName, lastName, mode, password, router],
  )

  const handleFieldChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((s) => ({ ...s, [name]: value }))
  }, [])

  const content = mode === 'register' ? registerContent : signinContent

  return (
    <Card>
      <div className='w-full'>
        <div className='text-center'>
          <h2 className='mb-2 text-3xl'>{content.header}</h2>
          <p className='tex-lg text-black/25'>{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className='w-full py-10'>
          {mode === 'register' && (
            <div className='flex justify-between mb-8'>
              <div className='pr-2'>
                <div className='mb-4 ml-2 text-lg text-black/50'>First Name</div>
                <Input
                  required
                  name='firstName'
                  placeholder='First Name'
                  value={formState.firstName}
                  className='w-full px-6 py-2 text-lg border-2 border-solid border-gray rounded-3xl'
                  onChange={handleFieldChange}
                />
              </div>
              <div className='pl-2'>
                <div className='mb-4 ml-2 text-lg text-black/50'>Last Name</div>
                <Input
                  required
                  name='lastName'
                  placeholder='Last Name'
                  value={formState.lastName}
                  className='w-full px-6 py-2 text-lg border-2 border-solid border-gray rounded-3xl'
                  onChange={handleFieldChange}
                />
              </div>
            </div>
          )}
          <div className='mb-8'>
            <div className='mb-4 ml-2 text-lg text-black/50'>Email</div>
            <Input
              required
              name='email'
              type='email'
              placeholder='Email'
              value={formState.email}
              className='w-full px-6 py-2 text-lg border-2 border-solid border-gray rounded-3xl'
              onChange={handleFieldChange}
            />
          </div>
          <div className='mb-8'>
            <div className='mb-4 ml-2 text-lg text-black/50'>Password</div>
            <Input
              required
              name='password'
              value={formState.password}
              type='password'
              placeholder='Password'
              className='w-full px-6 py-2 text-lg border-2 border-solid border-gray rounded-3xl'
              onChange={handleFieldChange}
            />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <span>
                <Link href={content.linkUrl} className='font-bold text-blue-600'>
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type='submit' intent='secondary'>
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  )
}
