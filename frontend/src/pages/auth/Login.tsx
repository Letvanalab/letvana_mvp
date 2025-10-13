import { LoginForm } from '@/components/forms/login-form'
import DecisionForm from '@/components/forms/decision-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { LoginSchemaType } from '@/lib/schema'
import { loginSchema } from '@/lib/schema'
import { useState } from 'react'


const Login = () => {
  const [userType, setUserType] = useState<'tenant' | 'landlord' | null>(null);
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      userType: userType || undefined,
    },
  })

  if (!userType) {
    return <DecisionForm setUserType={setUserType} />
  }


  return (
    <>
      <LoginForm form={form} userType={userType} />
    </>
  )
}

export default Login