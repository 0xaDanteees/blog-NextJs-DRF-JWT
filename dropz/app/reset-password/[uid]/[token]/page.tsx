import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import ResetPassword from "@/components/auth/resetPassword"

interface ResetPasswordProps {
  params: {
    uid: string
    token: string
  }
}

const ResetPasswordPage = async ({ params }: ResetPasswordProps) => {
  const { uid, token } = params;

  const user = await getAuthSession();

  if (user) {
    redirect("/")
  }

  return <ResetPassword uid={uid} token={token} />
}

export default ResetPasswordPage;