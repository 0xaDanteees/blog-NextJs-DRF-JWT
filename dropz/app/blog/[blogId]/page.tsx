import { getAuthSession } from "@/lib/nextauth";
import { getBlogDetail } from "@/actions/blog";
import FullBlog from "@/components/blog/FullBlog";

interface BlogPageProps {
    params: {
        blogId: string
    }
}

const BlogPage = async({params}: BlogPageProps)=>{
    const {blogId} = params;

    const user= await getAuthSession();

    const {success, blog} = await getBlogDetail({blogId});

    if(!success){

        return (
            <div className="text-center text-sm text-gray-600">
                Failed to retrieve blog :/ ...
            </div>
        )
    }

    if(!blog){
        return (
            <div className="text-center text-sm text-gray-600">
                Blog does not exist or was deleted...
            </div>
        )
    }

    return <FullBlog blog={blog} user={user} />

}

export default BlogPage;