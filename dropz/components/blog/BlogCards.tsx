"use client"

import { Blog } from "@/actions/blog"
import { formatDistance } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface BlogCardProps {
    blog: Blog
}

const BlogCard =({blog}: BlogCardProps)=>{
    const updatedAt= new Date(blog.updated_at ?? 0);
    const now = new Date();
    const date= formatDistance(updatedAt, now, {addSuffix: true});
    
    return (
    <div className="grid gap-6 md:gap-8 lg:gap-8 shadow-lg border-b  border-l mb-16">
      <Link href={`/blog/${blog.uid}`} className="inline-grid gap-2 not-visited:text-black dark:not-visited:text-white">
        <h2 className="text-2xl font-bold tracking-tight not-visited:text-black dark:not-visited:text-white ml-4">
          {blog.title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 ml-4">
          {blog.content.slice(0,255)}...
        </p>
        <div className="aspect-[16/9] relative overflow-hidden rounded-t-md">
          <Image
            fill
            src={blog.thumbnail || blog.author.avatar}
            alt="thumbnail"
            className="object-cover rounded-t-md transitin-all"
            />
        </div>
      </Link>
      <div className="text-xs ml-4">
        <div className="hover:underline flex break-words items-start">
          <Link href={`/profiles/${blog.author.username}`} className="flex items-center">
            <div className="relative w-10 h-10 flex-shrink-0">
                    <Avatar>
                        <AvatarImage src={blog.author.avatar} alt="user pfp"/>
                        <AvatarFallback>{blog.author.username.slice(0,1)}</AvatarFallback>
                    </Avatar>
                </div>
            <span className="ml-2 font-extrabold"> {blog.author.username}</span>
            </Link>
        </div>
        <div className="text-gray-400 font-bold py-1">{date}</div>
      </div>
    </div>
    )
}

export default BlogCard;