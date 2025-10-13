"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Zod validation schema
const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    phoneNumber: z.string().optional(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    rememberMe: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

type AccountType = "tenant" | "landlord" | null;

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      console.log("Register data:", {
        ...data,
        accountType,
      });
      // Add your registration logic here
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Register with ${provider}`);
    // Add your social authentication logic here
  };

  // Account Type Selection View
  if (accountType === null) {
    return (
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Image */}
        <div className="hidden lg:block relative">
          <Image
            src="/assets/authImage.jpg"
            alt="Letvana Homes"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-8 left-8">
            <Link href="/" className="w-full">
              <Image
                src="/assets/Logodark.svg"
                alt="Logo"
                width={239}
                height={28}
                className="object-contain"
              />
            </Link>
          </div>
        </div>

        {/* Right Side - Account Type Selection */}
        <div className="flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-right">
              <p className="text-sm text-gray-600">
                I have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-gray-900 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>

            {/* Account Type Cards */}
            <div className="w-full bg-white rounded-2xl shadow-sm p-8 space-y-6">
              <div className="w-full space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  Welcome to Letvana Homes
                </h2>
                <p className="text-gray-600">
                  Select the one that fits your needs and proceed.
                </p>
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tenant Account Card */}
                <button
                  onClick={() => setAccountType("tenant")}
                  className="relative p-6 border-2 border-gray-200 rounded-xl hover:border-teal-400 transition-colors text-left group"
                >
                  <div className="absolute top-4 right-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-teal-400" />
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                      <Image
                        src="/assets/vectors/tenant.png"
                        className="object-cover"
                        alt="tenant avatar"
                        width={55}
                        height={64}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Tenant Account
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        I want to rent property on this platform.
                      </p>
                    </div>
                  </div>
                </button>

                {/* Landlord/Agent Account Card */}
                <button
                  onClick={() => setAccountType("landlord")}
                  className="relative p-6 border-2 border-gray-200 rounded-xl hover:border-teal-400 transition-colors text-left group"
                >
                  <div className="absolute top-4 right-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-teal-400" />
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                      <Image
                        src="/assets/vectors/landlord.png"
                        className="object-cover"
                        alt="landlord avatar"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Landlord/ Agent Account
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        I have property or properties I want to rent out.
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <Button
                onClick={() => {
                  // This will be replaced by actual selection
                  if (accountType) return;
                }}
                className="w-full h-12 bg-main hover:bg-main-hover text-gray-900 font-semibold rounded-lg cursor-pointer"
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration Form View
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Image */}
      <div className="hidden lg:block relative">
        <Image
          src="/assets/authImage.jpg"
          alt="Letvana Homes"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-8 left-8">
          <Link href="/" className="w-full">
            <Image
              src="/assets/Logodark.svg"
              alt="Logo"
              width={239}
              height={28}
              className="object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-right">
            <p className="text-sm text-gray-600">
              I have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-gray-900 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
              <p className="text-gray-600">
                Let&apos;s get started! To set up your account with Letvana
                Homes,
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="First Name"
                            className="h-12 bg-gray-50 border-gray-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-medium">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Last Name"
                            className="h-12 bg-gray-50 border-gray-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="h-12 bg-gray-50 border-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">
                        Phone Number{" "}
                        <span className="text-gray-500">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your email address"
                          className="h-12 bg-gray-50 border-gray-200"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            className="h-12 bg-gray-50 border-gray-200 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 font-medium">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="h-12 bg-gray-50 border-gray-200 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remember Me */}
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal text-gray-700 cursor-pointer">
                        Remember Me
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-teal-400 hover:bg-teal-500 text-gray-900 font-semibold rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Login"}
                </Button>
              </form>
            </Form>

            {/* Social Login */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-600">
                    Or Continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Google */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  className="h-12 cursor-pointer border-gray-200 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2 text-sm">Google</span>
                </Button>

                {/* Apple */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("apple")}
                  className="h-12 cursor-pointer border-gray-200 hover:bg-gray-50"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <span className="ml-2 text-sm">Apple</span>
                </Button>

                {/* Facebook */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("facebook")}
                  className="h-12 cursor-pointer border-gray-200 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="ml-2 text-sm">Facebook</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
