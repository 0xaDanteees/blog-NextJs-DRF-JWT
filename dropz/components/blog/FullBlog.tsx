"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Blog, deleteBlog } from "@/actions/blog";
import { User } from "@/lib/nextauth";
import { toast } from "sonner";
import { Trash2, Edit } from "lucide-react";


interface FullBlogProps {
    blog: Blog
    user: User | null
}

const FullBlog = ({blog, user}: FullBlogProps) => {

    const [isLoading, setIsLoading] = useState(false);  
    const router = useRouter();

    const handleDelete = async () => {
    setIsLoading(true)
    if (blog.author.uid !== user?.uid) {
      toast.error("Couldnt delete blog...")
      return
    }

    try {
      const res = await deleteBlog({
        accessToken: user.accessToken,
        blogId: blog.uid,
      })

      if (!res.success) {
        toast.error("Failed to delete...");
        return
      }

      toast.success("Blog deleted, you safe lol");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="aspect-[16/9] relative">
        <Image
          fill
          src={blog.thumbnail || blog.author.avatar}
          alt="thumbnail"
          className="object-cover rounded-md"
        />
      </div>

      <div className="font-bold text-2xl break-words">{blog.title}</div>

      <div>
        <div className="flex items-center space-x-2">
          <Link href={`/user/${blog.author.uid}`}>
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src={blog.author.avatar || "/default.png"}
                className="rounded-full object-cover"
                alt={blog.author.username || "avatar"}
                fill
              />
            </div>
          </Link>

          <div>
            <div className="text-sm hover:underline break-words">
              <Link href={`/profiles/${blog.author.username}`}>{blog.author.username}</Link>
            </div>
            <div className="text-xs text-gray-400">
              {format(new Date(blog.updated_at), "yyyy/MM/dd HH:mm")}
            </div>
          </div>
        </div>
      </div>

      <div className="leading-relaxed break-words whitespace-pre-wrap">
        {blog.content}
      </div>

      {blog.author.uid === user?.uid && (
        <div className="flex items-center justify-end space-x-1">
          <Link href={`/blog/${blog.uid}/edit`}>
            <div className="hover:bg-gray-100 p-2 rounded-full">
              <Edit className="w-5 h-5" />
            </div>
          </Link>

          <button
            className="hover:bg-gray-100 p-2 rounded-full"
            disabled={isLoading}
            onClick={handleDelete}
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      )}
    </div>
  )


}
 
export default FullBlog;