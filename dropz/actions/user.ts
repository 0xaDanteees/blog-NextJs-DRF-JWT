"use server"

const fetchAPI= async(url: string, options: RequestInit)=>{
    const apiUrl= process.env.NEXT_PUBLIC_API_URL;

    if(!apiUrl){
        return { success: false, error: "API URL not config "}
    }

    try{ 
        const response = await fetch(`${apiUrl}${url}`, options);

        if(!response) {
            return {success: false, error: "Could fetch" }
        }

        const contentType = response.headers.get("Content-Type");

        if(contentType && contentType.includes("application/json")){
            const data= await response.json();
            
            return {success: true, data}
        }

        return {success: true}
    } catch(error){
        console.log(error);
        return {success: false, error: "unable to retrieve"}
    }

}

interface ProvitionalSignupProps {
    username: string
    email: string
    password: string
    re_password: string
}

export const provitionalSignup = async ({
    username,
    email,
    password,
    re_password
}: ProvitionalSignupProps)=>{
    const body = JSON.stringify({
        username,
        email,
        password,
        re_password: re_password,
    })

    const options={
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    };

    const response= await fetchAPI("/api/auth/users/", options);

    if (!response.success){
        console.error(response.error)
        return {success: false}
    }

    return {success:true}
}

interface CompletedSignupProps {
    uid: string,
    token: string
}

export const completedSignup = async ({uid, token}: CompletedSignupProps) =>{

    const body = JSON.stringify({

        uid,
        token
    });

    const options= {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body,
    };

    const response = await fetchAPI("/api/auth/users/activation/", options);

    if (!response.success) {
        console.error(response.error);
        return {success: false}
    }
    return {success: true}
}

interface ForgotPasswordProps {
  email: string
}

export const forgotPassword = async ({ email }: ForgotPasswordProps) => {
  const body = JSON.stringify({
    email,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };


  const result = await fetchAPI("/api/auth/users/reset_password/", options);

  if (!result.success) {
    console.error(result.error);
    return { success: false }
  }

  return { success: true }
}


interface ResetPasswordProps {
  uid: string
  token: string
  newPassword: string
  reNewPassword: string
}

export const resetPassword = async ({
  uid,
  token,
  newPassword,
  reNewPassword,
}: ResetPasswordProps) => {
  const body = JSON.stringify({
    uid,
    token,
    new_password: newPassword,
    re_new_password: reNewPassword,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };

  const result = await fetchAPI(
    "/api/auth/users/reset_password_confirm/",
    options
  );

  if (!result.success) {
    console.error(result.error);
    return { success: false }
  }

  return { success: true }
}


export interface UserDetails {

    uid: string
    username: string
    email: string
    avatar: string | undefined
    caption: string
    createdAt: string
}

interface GetUserDetailsProps {
    username: string
}

export const getUserDetails= async ({username}: GetUserDetailsProps)=>{

    const options: RequestInit= {
        method: "GET",
        cache: "no-store" ,
        
    }

    const response = await fetchAPI(`/api/profile/${username}/`, options);

    if (!response.success) {
        console.error(response.error)

        return { success: false, user: null}
    }

    const user: UserDetails = response.data;

    return {success: true, user}
}

interface UpdateProfileProps {
    accessToken: string
    username: string
    caption: string | undefined
    avatar: string | undefined
}

export const updateProfile= async({accessToken, username, caption,avatar }: UpdateProfileProps)=>{
    
    const body= JSON.stringify({
        username,
        caption,
        avatar,
    });

    const options= {
        method: "PATCH",
        headers: {
            Authorization: `JWT ${accessToken}`,
            "Content-Type": "application/json",
        },
        body,
    };

    const response = await fetchAPI("/api/auth/users/me/", options);

    if(!response.success){
        console.error(response.error)

        return {success: false, user:null}
    }

    const user: UserDetails= response.data;

    return {success: true, user}
}

interface UpdatePasswordProps {
    accessToken: string
    currentPassword: string
    newPassword: string
    reNewPassword: string
}

export const updatePassword= async({
    accessToken,
    currentPassword,
    newPassword,
    reNewPassword,
}: UpdatePasswordProps)=>{
    const body = JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
        re_new_password: reNewPassword,
    })

    const options = {
        method: "POST",
        headers: {
        Authorization: `JWT ${accessToken}`,
        "Content-Type": "application/json",
        },
        body,
    }

    const response = await fetchAPI("/api/auth/users/set_password/", options);

    if(!response.success){
        console.error(response.error);

        return {success: false}
    }

    return {success: true}
}