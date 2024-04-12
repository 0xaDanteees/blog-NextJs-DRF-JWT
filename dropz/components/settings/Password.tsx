"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updatePassword } from "@/actions/user"
import { User } from "@/lib/nextauth"
import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form, FormControl,
  FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader } from "lucide-react"
import { toast } from "sonner"


const FormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Password is 8 character (at least)" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    rePassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords does not match",
    path: ["rePassword"],
  })


type InputType = z.infer<typeof FormSchema>

interface PasswordProps {
  user: User
}

const Password = ({ user }: PasswordProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InputType>({
   resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);

    try {
      const res = await updatePassword({
        accessToken: user.accessToken,
        currentPassword: data.currentPassword,
        newPassword: data.password,
        reNewPassword: data.rePassword,
      })

      if (!res.success) {
        toast.error("Error updating your password");
        return
      }

      toast.success("Password changed.");
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Error updating your password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">Change Password</div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password"  placeholder="Current password" {...field} />
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
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="New Password" {...field} />
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
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Edit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Password