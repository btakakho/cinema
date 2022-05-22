import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/ui/FormElements/Button'
import { Heading } from '@/ui/Heading'

import { useAuth } from '@/hooks/useAuth'

import { Meta } from '@/utils/meta/Meta'

import styles from './Auth.module.scss'

import { IAuthInput } from './auth.interface'

import { useAuthRedirect } from './useAuthRedirect'

export const Auth = () => {
  useAuthRedirect()
  const { isLoading } = useAuth()
  const [type, setType] = useState<'login' | 'register'>('login')

  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({ mode: 'onChange' })

  const login = (data: IAuthInput) => {}
  const register = (data: IAuthInput) => {}

  const onSubmit: SubmitHandler<IAuthInput> = (data) => {
    if (type === 'login') login(data)
    else if (type === 'register') register(data)

    reset()
  }

  return (
    <Meta title="Auth">
      <section className={styles.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading className="mb-6">Auth</Heading>

          <div className={styles.buttons}>
            <Button
              type="submit"
              onClick={() => setType('login')}
              disabled={isLoading}
            >
              Login
            </Button>
            <Button
              type="submit"
              onClick={() => setType('register')}
              disabled={isLoading}
            >
              Register
            </Button>
          </div>
        </form>
      </section>
    </Meta>
  )
}
