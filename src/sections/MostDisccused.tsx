import PopularBlogTab from "@/components/ui/PopularBlogTab";
import { useGetPostsQuery } from "@/features/postApi";
import { Link } from "react-router-dom";

const MostDiscussed = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-red-500">Failed to load most discussed blogs.</p>
      </div>
    );
  }

  const mostDiscussedPosts = posts
    ? [...posts].sort((a, b) => b.commentCount - a.commentCount).slice(0, 4)
    : [];

  if (mostDiscussedPosts.length === 0) {
    return (
      <div className="py-8">
        <h2 className="text-start w-2/3 text-xl font-bold font-slab mb-4">
          Most Discussed Blogs
        </h2>
        <p className="text-gray-600">No discussions yet.</p>
        <hr className="mt-8 w-[78%] mx-auto" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-start w-2/3 text-xl font-bold font-slab mb-6">
        Most Discussed Blogs
      </h2>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="w-full flex flex-col gap-6">
          {mostDiscussedPosts.map((post) => {
            const avgRating =
              post.ratings.length > 0
                ? post.ratings.reduce((sum, rating) => sum + rating.score, 0) /
                  post.ratings.length
                : 0;

            return (
              <Link key={post._id} to={`/post/${post._id}`} className="block">
                <PopularBlogTab
                  id={post._id}
                  title={post.title}
                  snippet={post.snippet}
                  img={post.image || "/default-blog-image.jpg"}
                  rating={avgRating}
                  author={post.author.username}
                  comments={post.commentCount}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <hr className="mt-8 w-[78%] mx-auto" />
    </div>
  );
};

export default MostDiscussed;
