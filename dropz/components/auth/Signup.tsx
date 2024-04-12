"use client"

import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import {provitionalSignup} from "@/actions/user"
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import { 
    Form, FormControl,
    FormField, FormLabel,
    FormMessage, FormItem
} from "../ui/form";


const FormSchema = z.object({
    username: z.string().min(3, {message: "Username must be at least 3 characters..."}),
    email: z.string().email({message: "Enter a valid email..."}),
    password: z.string().min(8, {message: "Password must be at least 8 characters..."}),
    //re_password: z.string(),
})

type InputType = z.infer<typeof FormSchema>

const Signup = ()=>{
    const [isLoading, setLoading] = useState(false);
    const [isSIgnedup, setSignedup]= useState(false);

    const form = useForm<InputType>({
        resolver: zodResolver(FormSchema),
        
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    })


    const onSubmit: SubmitHandler<InputType>= async (data) =>{
        setLoading(true);
        try {
            const res = await provitionalSignup({
                username: data.username,
                email: data.email,
                password: data.password,
                re_password: data.password,
            })

            if(!res.success) {
                toast.error('Couldnt Signup, try again.')
                return
            }

            setSignedup(true);
        } catch(error){
            toast.error('Signup failed')
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="max-w-[500px] m-auto">
            {isSIgnedup ? (
                <>
                    <div className="text-2xl font-bold text-center mb-10">
                        Account created, Welcome to DROPZ!
                    </div>
                    <div >
                        We have sent you an activation email
                        <br/>
                        please activate your account to start creating!
                        <br/>
                        If you don't receive the email you likely gave us a wrong address
                        <br/>
                        You must check your info and try again if that is the case...
                    </div>
                </>
            ) : (
                <>
                    <div className="text-2xl font-bold text-center mb-10">
                        Signup
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                            
                                control={form.control}
                                name="username"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                            
                                control={form.control}
                                name="email"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>email</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="DROPZ@mail.com" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                            
                                control={form.control}
                                name="password"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input  type="password" placeholder="password" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="text-sm text-gray-600">
                                I agree to Privacy, Use Terms and Policy.
                            </div>
                            <Button disabled={isLoading} type="submit" className="w-full">
                                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                                Signup
                            </Button>
                        </form>
                    </Form>

                    <div className="text-center mt-5">
                        <Link href="/login" className="text-sm text-blue-700">
                                Already have an account?
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default Signup;