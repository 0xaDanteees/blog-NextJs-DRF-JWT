import { getAllBlogs } from "@/actions/blog";
import BlogCard from "@/components/blog/BlogCards";



const Home= async () =>{

  const {success, blogs}= await getAllBlogs();
  if (!success) {
    return (
      <div className="text-center text-sm text-gray-500">
       Failed to load blogs ):
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500">No posts yet... DROP one! </div>
    )
  }
  
  return (
    <main className="flex flex-col items-center justify-start">
      <header className="max-w-5xl w-full p-4 text-sm">
        <div className="container px-4 space-y-4 md:space-y-8">
          <div className="space-y-1.5">
            <h1 className="text-3xl  flex font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Featured Blogs
              
            </h1>
            
            <p className="text-gray-500 dark:text-gray-400">Check out our popular blog posts</p>
          </div>
          <div>
            {blogs.map((blog) => (
            <BlogCard key={blog.uid} blog={blog} />
            
          ))}
          </div>
        </div>
      </header>

    </main>
  );
}

export default Home;