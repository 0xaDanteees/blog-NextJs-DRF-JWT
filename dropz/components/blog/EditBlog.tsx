"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import { Blog, editBlog } from "@/actions/blog"
import { Loader } from "lucide-react"
import { User } from "@/lib/nextauth"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form, FormControl,
  FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageUploading, { ImageListType } from "react-images-uploading"
import Image from "next/image"
import { toast } from "sonner"


const FormSchema = z.object({
  title: z.string().min(1, { message: "Title can't be empty..." }),
  content: z.string().min(1, { message: "Content can't be empty..." }),
})

type InputType = z.infer<typeof FormSchema>

interface BlogEditProps {
  user: User
  blog: Blog
}

const BlogEdit = ({ user, blog }: BlogEditProps) => {
  const router = useRouter();
  const [ThumbnailUpload, setThumbnailUpload] = useState<ImageListType>([
    {
      dataURL: blog.thumbnail || user.avatar,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: blog.title || "",
      content: blog.content || "",
    },
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);
    let base64Image;

    if (
    ThumbnailUpload[0].dataURL &&
    ThumbnailUpload[0].dataURL.startsWith("data:image")
    ) {
      base64Image = ThumbnailUpload[0].dataURL
    }

    try {
      const response = await editBlog({
        accessToken: user.accessToken,
        blogId: blog.uid,
        title: data.title,
        content: data.content,
        thumbnail: base64Image,
      })

      if (!response.success) {
        toast.error("Failed to edit...")
        return
      }

      toast.success("blog edited!")
      router.push(`/blog/${blog.uid}`)
      router.refresh()
    } catch (error) {
      toast.error("Failed to edit...")
    } finally {
      setIsLoading(false)
    }
  }

  const onChangeThumbnail = (imageList: ImageListType) => {
    const file = imageList[0]?.file
    const maxFileSize = 2 * 1024 * 1024

    if (file && file.size > maxFileSize) {
      toast.error("Max file size is 2MB")
      return
    }

    setThumbnailUpload(imageList)
  }

  return (
    <div>
      <div className="text-2xl font-bold text-center mb-5">Edit my DROP</div>
      <Form {...form}>
        <div className="mb-5">
          <FormLabel>Thumbnail</FormLabel>
          <div className="mt-2">
            <ImageUploading
              value={ThumbnailUpload}
              onChange={onChangeThumbnail}
              maxNumber={1}
              acceptType={["jpg", "png", "jpeg"]}
            >
              {({ imageList, onImageUpdate }) => (
                <div className="w-full">
                  {imageList.map((image, index) => (
                    <div key={index}>
                      {image.dataURL && (
                        <div className="aspect-[16/9] relative">
                          <Image
                            fill
                            src={image.dataURL}
                            alt="thumbnail"
                            className="object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {imageList.length > 0 && (
                    <div className="text-center mt-3">
                      <Button
                        variant="outline"
                        onClick={() => onImageUpdate(0)}
                      >
                        Edit thumbnail
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </ImageUploading>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea placeholder="Text..." {...field} rows={15} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Edit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default BlogEdit;