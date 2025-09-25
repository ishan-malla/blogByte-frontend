import SpotlightCard from "@/components/ui/SpotlightCard";
import BlogTab from "@/components/ui/BlogTab";
import HeadLines from "@/components/HeadLines";
import { useGetPostsQuery } from "@/features/postApi";

const RecentSection = () => {
  const { data: posts = [], isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <p>Loading recent blogs...</p>;
  if (isError) return <p>Failed to load blogs.</p>;
  if (posts.length === 0) return <p>No posts available.</p>;

  const latestPost = posts[0];

  const latestAvg =
    latestPost.ratings.length > 0
      ? latestPost.ratings.reduce((sum, r) => sum + r.score, 0) /
        latestPost.ratings.length
      : 0;

  return (
    <>
      <div className="w-full flex md:pt-2 justify-center px-4">
        <div className="max-w-7xl w-full flex flex-col sm:flex-row gap-5">
          {/* Spotlight (latest post) */}
          <section className="flex-1 flex flex-col xl:flex-row gap-6">
            <SpotlightCard
              id={latestPost._id}
              title={latestPost.title}
              snippet={latestPost.snippet}
              img={latestPost.image}
              comments={latestPost.commentCount}
              ratings={latestAvg}
              author={latestPost.author.username}
            />

            {/* Blog tabs (all other posts) */}
            <div className="w-full flex flex-col gap-4 border-x">
              {posts.slice(1).map((item) => {
                const avg =
                  item.ratings.length > 0
                    ? item.ratings.reduce((sum, r) => sum + r.score, 0) /
                      item.ratings.length
                    : 0;

                return (
                  <BlogTab
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    snippet={item.snippet}
                    img={item.image || "/placeholder.jpg"}
                    author={item.author.username}
                    rating={avg}
                    comments={item.commentCount}
                  />
                );
              })}
            </div>
          </section>

          {/* Headlines sidebar */}
          <section className="w-full xl:w-[15.5%]">
            <HeadLines />
          </section>
        </div>
      </div>
      <hr className="mt-8 w-[78%] mx-auto" />
    </>
  );
};

export default RecentSection;
