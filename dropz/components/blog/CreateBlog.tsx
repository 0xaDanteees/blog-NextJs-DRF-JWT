"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import { createBlog } from "@/actions/blog"
import { User } from "@/lib/nextauth"
import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form, FormControl,
  FormField,FormItem,
  FormLabel,FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import ImageUploading, { ImageListType } from "react-images-uploading"
import Image from "next/image"


const FormSchema = z.object({
  title: z.string().min(1, { message: "Enter a title..." }),
  content: z.string().min(1, { message: "Type something bro..." }),
})

type InputType = z.infer<typeof FormSchema>

interface BlogNewProps {
  user: User
}


const CreateBlog = ({ user }: BlogNewProps) => {
  
  const [imageUpload, setImageUpload] = useState<ImageListType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const form = useForm<InputType>({
       resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })


  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);
    let base64Image;

    if (imageUpload.length) {
      base64Image = imageUpload[0].dataURL
    }

    try {

      const res = await createBlog({
        accessToken: user.accessToken,
        title: data.title,
        content: data.content,
        thumbnail: base64Image,
      })

      if (!res.success || !res.blog) {
        toast.error("couldnt post :/ ...");
        return
      }

      toast.success("you DID DROP!!!");
      router.push(`/blog/${res.blog.uid}`);
      router.refresh();
    } catch (error) {
      toast.error("Couldnt post...");
    } finally {
      setIsLoading(false);
    }
  }

  const onChangeImage = (imageList: ImageListType) => {
    const file = imageList[0]?.file;
    const maxFileSize = 2 * 1024 * 1024;

    if (file && file.size > maxFileSize) {
      toast.error("Image size can be up to 2MB, try a different one :3");
      return
    }

    setImageUpload(imageList)
  }

  return (
    <div>
      <div className="text-2xl font-bold text-center mb-5">New DROP</div>
      <Form {...form}>
        <div className="mb-3">
          <FormLabel>Thumbnail</FormLabel>
          <div className="mt-2">
            <ImageUploading
              value={imageUpload}
              onChange={onChangeImage}
              maxNumber={1}
              acceptType={["jpg", "png", "jpeg"]}
            >
              {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                <div className="w-full">
                  {imageList.length == 0 && (
                    <button
                      onClick={onImageUpload}
                      className="w-full border-2 border-dashed rounded-md h-32 hover:bg-gray-50 mb-3"
                      {...dragProps}
                    >
                      <div className="text-gray-400 font-bold mb-2">
                       Drag your thumbail or submit here.
                      </div>
                      <div className="text-gray-400 text-xs">
                       jpg/jpeg/png
                      </div>
                      <div className="text-gray-400 text-xs">
                        Max file size: 2MB
                      </div>
                    </button>
                  )}

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
                        Change thumbnail
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
                  <Textarea placeholder="Text..." {...field} rows={9} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            DROP
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateBlog;