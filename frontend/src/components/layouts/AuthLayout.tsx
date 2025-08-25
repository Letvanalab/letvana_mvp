import { Outlet } from "react-router"

export default function AuthLayout() {
  return (
    <div className="h-screen p-8 w-full">
      <div className="grid h-full lg:grid-cols-2 rounded-lg w-full">
      <div className="bg-muted relative hidden lg:block">
        <h1 className="absolute top-6 left-6 text-2xl font-bold z-10">Letvana Homes</h1>
        <img
          src="/auth-picture.png"
          alt="Auth Image"
          className="absolute inset-0 h-full w-full object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-6 p-8 md:p-12 bg-white">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
