import PopularBlogTab from "@/components/ui/PopularBlogTab";
import { useGetPostsQuery } from "@/features/postApi";
import { Link } from "react-router-dom";

const PopularSection = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Failed to load popular blogs.</p>
      </div>
    );
  }

  const popularPosts = posts
    ? [...posts]
        .sort((a, b) => {
          const aRating =
            a.ratings.length > 0
              ? a.ratings.reduce((sum, rating) => sum + rating.score, 0) /
                a.ratings.length
              : 0;
          const bRating =
            b.ratings.length > 0
              ? b.ratings.reduce((sum, rating) => sum + rating.score, 0) /
                b.ratings.length
              : 0;

          return (
            b.commentCount + bRating * 10 - (a.commentCount + aRating * 10)
          );
        })
        .slice(0, 4)
    : [];

  return (
    <>
      <h2 className="text-start w-2/3 text-xl font-bold font-slab">
        Popular Blogs
      </h2>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="w-full flex flex-col gap-15 border-x sm:gap-4 items-center">
          {popularPosts.map((post) => {
            const avgRating =
              post.ratings.length > 0
                ? post.ratings.reduce((sum, rating) => sum + rating.score, 0) /
                  post.ratings.length
                : 0;

            return (
              <Link key={post._id} to={`/post/${post._id}`} className="block">
                <PopularBlogTab
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  img={post.image}
                  rating={avgRating}
                  comments={post.commentCount}
                  snippet={post.snippet}
                  author={post.author.username}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <hr className="mt-8 w-[78%] mx-auto" />
    </>
  );
};

export default PopularSection;
