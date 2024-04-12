"use client"

import { useState } from "react";
import { signIn } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import {
  Form, FormControl,
  FormField, FormItem,
  FormLabel,FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { toast } from "sonner";
import Link from "next/link"


const FormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8, { message: "Remeber password are 8 characters at least, try again" }),
})

type InputType = z.infer<typeof FormSchema>

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InputType>({
    resolver: zodResolver(FormSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<InputType> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          toast.error("Login failed ):")
        } else {
          window.location.href = "/"
        }
      })
      .catch((error) => {
        toast.error("Login failed ):")
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className="max-w-[400px] m-auto">
      <div className="text-2xl font-bold text-center mb-10">Login</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="DROPZ@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input  type="password" placeholder="password" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>

      <div className="text-center mt-5">
        <Link href="/reset-password" className="text-sm text-blue-500">
          Forgot your password?
        </Link>
      </div>

      <div className="text-center mt-2">
        <Link href="/signup" className="text-sm text-blue-500">
          Don't have an account yet? Click here.
        </Link>
      </div>
    </div>
  )
}

export default Login;