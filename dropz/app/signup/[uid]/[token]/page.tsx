import Link from "next/link";
import { redirect } from "next/navigation";
import { completedSignup } from "@/actions/user";
import { getAuthSession } from "@/lib/nextauth";
import { Button } from "@/components/ui/button";


interface CompletedSignupPageProps {
    params: {
        uid: string
        token: string
    }
}

const CompletedSignupPage = async({params}: CompletedSignupPageProps)=>{

    const {uid, token}=params;

    const user= await getAuthSession();

    if (user){
        redirect("/");
    }

    const response = await completedSignup({uid,token});

    if(response.success){
        return (
      <div className="max-w-[400px] m-auto text-center">
        <div className="text-2xl font-bold mb-10">Verification completed!</div>
        <div>Account registration completed, you can start creating</div>
        <div className="mb-5">Login now!</div>
        <Button asChild className="font-bold">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    )
  } else {
    return (
      <div className="max-w-[400px] m-auto text-center">
        <div className="text-2xl font-bold mb-10">Something went wrong, try later please</div>
        <div>Account registration unfortunately failed</div>
        <div className="mb-5">Please complete Verification steps again</div>
        <Button asChild className="font-bold">
          <Link href="/signup">Signup</Link>
        </Button>
      </div>
    )
  }
}

export default CompletedSignupPage;