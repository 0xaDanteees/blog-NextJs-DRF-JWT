"use client"

import { UserDetails } from "@/actions/user";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "../ui/separator";
import { Blog, getAllBlogs } from "@/actions/blog";
import { useState, useEffect } from "react"; 
import UserBlogs from "../blog/UserBlogs";

interface UserDetailsProps {
    user: UserDetails
    blog: Blog
}

const UserDetail = ({ user }: UserDetailsProps) => {

    const [userBlogs, setUserBlogs] = useState<Blog[]>([]); 

    useEffect(() => {
        retrieveUserBlogs(); 
    }, []); 

    const retrieveUserBlogs = async () => {
        const { success, blogs } = await getAllBlogs();
        if (!success) {
            console.error("Failed to load blogs");
            return;
        }
        const filteredBlogs: Blog[] = blogs.filter((blog: Blog) => blog.author.username === user.username);

        setUserBlogs(filteredBlogs); 
    }

    return (
        <div className="w-full h-full py-2">
            <div className="flex justify-center items-center mb-5 ">
                <div className="w-36 h-36">
                    <Avatar >
                        <AvatarImage src={user.avatar} className="rounded-full" alt="user pfp" />
                        <AvatarFallback>{user.username}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className="space-y-5 break-words whitespace-pre-wrap mb-5 ">
                <div className="font-bold text-xl text-center">{user.username}</div>
                <Separator />
                <div className="leading-relaxed justify-center">{user.caption}</div>
                <Separator />
                <div className="grid grid-cols-3 gap-4 py-3">
                    {userBlogs.map((blog: Blog) => (
                        <UserBlogs key={blog.uid} blog={blog} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserDetail;
