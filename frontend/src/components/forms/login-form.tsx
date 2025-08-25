import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UseFormReturn } from "react-hook-form"
import type { LoginSchemaType } from "@/lib/schema"
import { Loader2 } from "lucide-react"
import { Checkbox } from "../ui/checkbox"




export function LoginForm({
  className,
  form,
  userType,
  ...props
}: React.ComponentProps<"form"> & { form: UseFormReturn<LoginSchemaType>, userType: 'tenant' | 'landlord' }) {
  const { register, handleSubmit, formState: { errors } } = form
  
  const onSubmit = (data: LoginSchemaType) => {
    console.log(data)
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start gap-2 text-left">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Provide your credentials to proceed
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required {...register("email")} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required {...register("password")} />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="rememberMe" {...register("rememberMe")} />
          <Label htmlFor="rememberMe">Remember me</Label>
        </div>
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader2 className="animate-spin" /> : 'Login'}
          Login
        </Button>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4" onClick={() => form.setValue('userType', userType === 'tenant' ? 'landlord' : 'tenant')}>
          Sign up
        </a>
      </div>
    </form>
  )
}
