import CommentSection from "@/components/CommentSection";
import { useParams } from "react-router-dom";
import {
  useGetPostByIdQuery,
  useAddOrUpdateRatingMutation,
  useGetRatingsQuery,
} from "@/features/postApi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/sections/store/store";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError } = useGetPostByIdQuery(id!);
  const { data: ratingsData, refetch: refetchRatings } = useGetRatingsQuery(
    id!
  );
  const [addOrUpdateRating] = useAddOrUpdateRatingMutation();

  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);

  console.log(post);
  console.log("Ratings data:", ratingsData);

  useEffect(() => {
    if (ratingsData && user) {
      const existingRating = ratingsData.ratings.find(
        (rating) => rating.user._id === user.id
      );
      if (existingRating) {
        setUserRating(existingRating.score);
      }
    }
  }, [ratingsData, user]);

  if (isLoading) {
    return <div className="text-center mt-10">Loading post...</div>;
  }

  if (isError || !post) {
    return <div className="text-center mt-10">Post not found</div>;
  }

  const averageRating = ratingsData?.averageRating
    ? Math.round(parseFloat(ratingsData.averageRating))
    : 0;
  const totalRatings = ratingsData?.totalRatings || 0;

  const authorName =
    typeof post.author === "object" ? post.author.username : post.author;

  const handleRatingClick = async (score: number) => {
    if (!user) {
      alert("Please log in to rate this post");
      return;
    }

    setIsSubmittingRating(true);
    try {
      await addOrUpdateRating({ postId: id!, score }).unwrap();
      setUserRating(score);
      refetchRatings();
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Failed to submit rating. Please try again.");
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleMouseEnter = (score: number) => {
    setHoverRating(score);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <article className="flex flex-col items-center px-4 md:px-0">
      <header className="flex flex-col gap-2 w-full md:w-1/2">
        <figure>
          <img
            src={post.image || "https://via.placeholder.com/800x400"}
            alt={post.title}
            className="w-full object-cover rounded-lg"
          />
          <figcaption className="sr-only">{post.title}</figcaption>
        </figure>

        <h1 className="text-2xl font-domine font-semibold mt-4">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 font-semibold">
              {authorName?.charAt(0).toUpperCase()}
            </div>
            <span>
              By <strong>{authorName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="text-yellow-400">
                {i < averageRating ? "⭐" : "☆"}
              </span>
            ))}
            <span className="ml-1 text-gray-500">
              ({averageRating}/5 • {totalRatings} rating
              {totalRatings !== 1 ? "s" : ""})
            </span>
          </div>
        </div>

        {/* User Rating Section */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {user ? "Rate this post:" : "Log in to rate this post"}
            </h3>

            {user && (
              <div className="flex flex-col gap-2">
                {userRating > 0 && (
                  <p className="text-sm text-gray-600">
                    Your rating: {userRating}/5 stars
                  </p>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const starValue = i + 1;
                    const isHovered = hoverRating >= starValue;
                    const isRated = userRating >= starValue;
                    const isActive = isHovered || (!hoverRating && isRated);

                    return (
                      <button
                        key={i}
                        type="button"
                        className={`text-2xl transition-colors duration-200 ${
                          isActive
                            ? "text-yellow-400"
                            : "text-gray-300 hover:text-yellow-300"
                        } ${
                          isSubmittingRating
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                        onClick={() => handleRatingClick(starValue)}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        onMouseLeave={handleMouseLeave}
                        disabled={isSubmittingRating}
                      >
                        {isActive ? "⭐" : "☆"}
                      </button>
                    );
                  })}

                  {isSubmittingRating && (
                    <span className="ml-2 text-sm text-gray-500">
                      Submitting...
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500">
                  Click a star to rate • You can change your rating anytime
                </p>
              </div>
            )}

            {!user && (
              <p className="text-sm text-gray-500">
                Please log in to rate and comment on this post.
              </p>
            )}
          </div>
        </div>
      </header>

      <section className="w-full md:w-1/2 mt-6 text-base leading-7 text-gray-700 font-baskerville tracking-tight whitespace-pre-line">
        {post.content}
      </section>

      <CommentSection postId={post._id} />
    </article>
  );
};

export default BlogPost;
