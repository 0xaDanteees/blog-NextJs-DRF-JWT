"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { resetPassword } from "@/actions/user"
import {
  Form,FormControl,
  FormField,FormItem,
  FormLabel,FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { toast } from "sonner"



const FormSchema = z
  .object({
    password: z.string().min(8, { message: "Password must be at least 8 character..." }),
    rePassword: z
      .string()
      .min(8, { message: "Password must be 8 characters at least" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password does not match, try again...",
    path: ["repeatedPassword"], 
  })


type InputType = z.infer<typeof FormSchema>

interface ResetPasswordProps {
  uid: string
  token: string
}

const ResetPassword = ({ uid, token }: ResetPasswordProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);


  const form = useForm<InputType>({

    resolver: zodResolver(FormSchema),

    defaultValues: {
      password: "",
      rePassword: "",
    },
  })


  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);

    try {
      const res = await resetPassword({
        uid,
        token,
        newPassword: data.password,
        re_password: data.rePassword,
      })

      if (!res.success) {
        toast.error("Password reset failed");
        return
      }

      setIsReset(true)
    } catch (error) {
      toast.error("Password reset failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-[400px] m-auto">
      {isReset ? (
        <div className="text-center">
          <div className="text-2xl font-bold mb-10">Password successfully reset!</div>

          <div>Password reset proccess completed</div>
          <div className="mb-5">Login now</div>
          <Button asChild className="font-bold">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="text-2xl font-bold text-center mb-10">
            Ressetting your password, please hold on...
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>confirm new password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="confirm new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                send
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  )
}

export default ResetPassword;