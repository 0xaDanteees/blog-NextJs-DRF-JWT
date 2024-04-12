"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPassword } from "@/actions/user";
import { toast } from "sonner";
import { 
    Form, FormControl,
    FormField, FormItem,
    FormMessage, FormLabel 
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";


const FormSchema= z.object({
    email: z.string().email({message: "Enter a valid email"}),
})

type InputType = z.infer<typeof FormSchema>

const ForgotPassword= ()=>{
    
    const [isLoading, setIsLoading]= useState(false);
    const [isForgotten, setIsForgotten]=useState(false);

    const form= useForm<InputType>({
        resolver: zodResolver(FormSchema),

        defaultValues: {
            email: "",
        },
    })

    const onSubmit: SubmitHandler<InputType>= async(data)=>{
        setIsLoading(true)

        try{
            const response= await forgotPassword(data)

            if(!response.success){
                toast.error("We couldnt reset your password :/");
                return
            }

            setIsForgotten(true)
        } catch(error){
            toast.error("We couldnt reset your password...")
        
        } finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-[400px] m-auto">
      {isForgotten ? (
        <>
          <div className="text-2xl font-bold text-center mb-10">
            Send password reset email
          </div>
          <div className="">
            please check your email, we have sent you a reset link
            <br />
            We redirecting you...
            <br />
            *if you don't recieve the email you likely gave us a wrong email
            <br />
            you'll need to give us a valid email
          </div>
        </>
      ) : (
        <>
          <div className="text-2xl font-bold text-center mb-10">
            Resseting password
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="DROPZ@gmail.com" {...field} />
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

export default ForgotPassword;