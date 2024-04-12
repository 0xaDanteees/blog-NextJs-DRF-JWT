import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import CreateBlog from "@/components/blog/CreateBlog"


const CreatePage = async () => {
  const user = await getAuthSession()

  if (!user) {
    redirect("/login")
  }

  return <CreateBlog user={user} />
}

export default CreatePage