"use client"

import { Blog } from "@/actions/blog"
import { formatDistance } from "date-fns"
import Image from "next/image"
import Link from "next/link"

import { Card } from "@/components/ui/card"



interface BlogCardProps {
    blog: Blog
}

const UserBlogs=({blog}: BlogCardProps) =>{

    const updatedAt= new Date(blog.updated_at ?? 0);
    const now = new Date();
    const date= formatDistance(updatedAt, now, {addSuffix: true});
  return (
    <Link href={`/blog/${blog.uid}`}>
    <Card className="w-full max-w-sm">
        
      <div className="grid gap-2.5">
        <div className="rounded-lg overflow-hidden aspect-[4/3]">
          <Image
            width={400}
            height={400}
            src={blog.thumbnail || blog.author.avatar}
            alt="thumbnail"
            className="object-cover rounded-t-md transitin-all"
            />
        </div>
        <div className="grid gap-0.5">
          <div className="grid gap-0.5">
            <h3 className="text-lg font-semibold px-2">{blog.title.slice(0,21)}...</h3>
            <p className="text-sm leading-none px-2 pt-1">{blog.content.slice(0,21)}...</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex py-6" />
            <div className="flex items-center gap-1 text-gray-400 font-bold pr-2 pb-1 mr-auto">
              {date}
            </div>
          </div>
        </div>
      </div>
    </Card>
    </Link>
  )
}

export default UserBlogs;
