
import { redirect } from "next/navigation"
import { getAuthSession } from "@/lib/nextauth"
import { getBlogDetail } from "@/actions/blog"
import EditBlog from "@/components/blog/EditBlog"

interface EditPageProps {
  params: {
    blogId: string
  }
}


const EditPage = async ({ params }: EditPageProps) => {
  const { blogId } = params

  const user = await getAuthSession();

  if (!user) {
    redirect("/login");
  }


  const { success, blog } = await getBlogDetail({ blogId });

  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        Couldn't fetch blog :/
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="text-center text-sm text-gray-500">No existing blog</div>
    )
  }

  if (blog.author.uid !== user.uid) {
    return <div className="text-center">Couldn't edit blog :/ ...</div>
  }

  return <EditBlog user={user} blog={blog} />
}

export default EditPage;