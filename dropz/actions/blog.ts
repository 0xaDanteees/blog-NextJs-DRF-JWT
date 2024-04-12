"use server"

import { User } from "@/lib/nextauth"

const fetchAPI= async(url: string, options: RequestInit)=>{

    const apiURL= process.env.NEXT_PUBLIC_API_URL;

    if(!apiURL){
        return {success: false, error: "Couldnt connect to API"}
    }

    try {
        const response = await fetch(`${apiURL}${url}`, options);

        if(!response.ok){
            return {success: false, error: "API ERROR"}
        }

        const contentType= response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")){
            const data = await response.json();

            return {success:true, data}
        }
        return {success: true}
    } catch (error){
        console.log(error);

        return {success: false, error: "Network error"}
    }
}

export interface Blog {
    uid: string
    author: User
    thumbnail: string | undefined
    title: string
    content: string 
    updated_at: string
    created_at: string
}

export const getAllBlogs = async()=>{
    const options: RequestInit = {
        method: "GET",
        cache: "no-store",
    };

    const response = await fetchAPI("/api/blogs/", options);

    if (!response.success){
        console.error(response.error);
        return {success: false, blogs: []}
    }

    const blogs: Blog[]=response.data;

    return {success: true, blogs}
}

export const getBlogDetail = async ({ blogId }: { blogId: string }) => {
  const options: RequestInit = {
    method: "GET",
    cache: "no-store",
  };


  const response = await fetchAPI(`/api/blog/${blogId}/`, options);

  if (!response.success) {
    console.error(response.error);
    return { success: false, blog: null }
  }

  const blog: Blog = response.data;

  return { success: true, blog }
}

interface CreateBlog {
  accessToken: string
  title: string
  content: string
  thumbnail: string | undefined
}

export const createBlog = async ({
  accessToken,
  title,
  content,
  thumbnail,
}: CreateBlog) => {
  const body = JSON.stringify({
    title: title,
    content: content,
    thumbnail: thumbnail,
  })

  const options = {
    method: "POST",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  }

  const response = await fetchAPI("/api/dropz/", options);

  if (!response.success) {
    console.error(response.error)
    return { success: false, post: null }
  }

  const blog: Blog = await response.data;

  return { success: true, blog }
}

interface EditBlog {
    accessToken: string
    blogId: string
    title: string
    content: string
    thumbnail: string | undefined
}

export const editBlog = async ({
  accessToken,
  blogId,
  title,
  content,
  thumbnail,
}: EditBlog) => {
  const body = JSON.stringify({
    title: title,
    content: content,
    thumbnail: thumbnail,
  })

  const options = {
    method: "PATCH",
    headers: {
      Authorization: `JWT ${accessToken}`,
      "Content-Type": "application/json",
    },
    body,
  };

  const response = await fetchAPI(`/api/dropz/${blogId}/`, options);

  if (!response.success) {
    console.error(response.error);
    return { success: false }
  }

  return { success: true }
}

interface DeleteBlog {
  accessToken: string
  blogId: string
}

export const deleteBlog = async ({ accessToken, blogId }: DeleteBlog) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `JWT ${accessToken}`,
    },
  }


  const response = await fetchAPI(`/api/dropz/${blogId}/`, options);

  if (!response.success) {
    console.error(response.error);
    return { success: false }
  }

  return { success: true }
}


