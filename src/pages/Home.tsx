import SpotlightCard from "@/components/ui/SpotlightCard";
import { useGetPostsQuery } from "@/features/postApi";

export default function Home() {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">Failed to load posts</div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 sm:w-3/4">
        {posts?.map((post) => (
          <div key={post._id} className="aspect-square">
            <SpotlightCard
              id={post._id}
              title={post.title}
              img={post.image}
              rating={4.5}
              comments={post.comments.length}
              author={post.author?.username || "Anonymous"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
