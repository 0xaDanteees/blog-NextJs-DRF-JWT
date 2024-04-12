import { getUserDetails } from "@/actions/user";
import UserDetail from "@/components/profiles/UserDetails";


interface UserDetailsPageProps {
    params: {
        username: string
    }
}

const UserDetailsPage= async ({params}: UserDetailsPageProps)=>{

    const {username}=params;

    const {success, user}= await getUserDetails({username});
    if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
        Something went wrong, we're sorry
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center text-sm text-gray-500">
        User does not exist (yet)...
      </div>
    )
  }

  return <UserDetail user={user} />
}

export default UserDetailsPage
