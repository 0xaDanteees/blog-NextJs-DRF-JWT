"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User } from "@/lib/nextauth"
import { updateProfile } from "@/actions/user"
import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,FormControl,
  FormField,FormItem,
  FormLabel,FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader } from "lucide-react"
import ImageUploading, { ImageListType } from "react-images-uploading"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"


const Formschema = z.object({
  username: z.string().min(3, { message: "Username should be 3 characters at least" }),
  caption: z.string().optional(),
})


type InputType = z.infer<typeof Formschema>

interface ProfileProps {
  user: User
}


const Profile = ({ user }: ProfileProps) => {
  const router = useRouter();
  const [avatarUpload, setAvatarUpload] = useState<ImageListType>([
    {
      dataURL: user.avatar || "/default.png",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm<InputType>({
    resolver: zodResolver(Formschema),
    defaultValues: {
      username: user.username || "",
      caption: user.caption || "",
    },
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true);
    let base64Image;

    if (
      avatarUpload[0].dataURL &&
      avatarUpload[0].dataURL.startsWith("data:image")
    ) {
      base64Image = avatarUpload[0].dataURL
    }

    try {
      const res = await updateProfile({
        accessToken: user.accessToken,
        username: data.username,
        caption: data.caption,
        avatar: base64Image,
      })

      if (!res.success) {
        toast.error("We couldn't update your profile")
        return
      }

      toast.success("Profile edited.")
      router.refresh()
    } catch (error) {
      toast.error("We couldn't update your profile")
    } finally {
      setIsLoading(false)
    }
  }

  const onChangeImage = (imageList: ImageListType) => {
    const file = imageList[0]?.file;
    const maxFileSize = 2 * 1024 * 1024;

    if (file && file.size > maxFileSize) {
      toast.error("Max avatar change is 2MB, try another one :3")
      return
    }

    setAvatarUpload(imageList);
  }

  return (
    <div className="w-5xl">
      <div className="text-xl font-bold text-center mb-5">Profile</div>

      <Form {...form}>
        <div className="mb-5">
          <ImageUploading
            value={avatarUpload}
            onChange={onChangeImage}
            maxNumber={1}
            acceptType={["jpg", "png", "jpeg"]}
          >
            {({ imageList, onImageUpdate }) => (
              <div className="w-full flex flex-col items-center justify-center">
                {imageList.map((image, index) => (
                  <div key={index}>
                    {image.dataURL && (
                      <div className="w-24 h-24 relative">
                        <Avatar className="h-full w-full object-cover">
                          <AvatarImage src={user.avatar} alt="user pfp"/>
                          <AvatarFallback>{user.username.slice(0,1)}</AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </div>
                ))}

                {imageList.length > 0 && (
                  <div className="text-center mt-3">
                    <Button variant="outline" onClick={() => onImageUpdate(0)}>
                     Change avatar
                    </Button>
                  </div>
                )}
              </div>
            )}
          </ImageUploading>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Email</FormLabel>
            <Input value={user.email!}  placeholder="Set new email"disabled />
          </FormItem>

          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Caption</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell people about you..." {...field} rows={10} />
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

export default Profile