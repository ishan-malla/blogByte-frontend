import SpotlightCard from "@/components/ui/SpotlightCard";

const blogData = [
  {
    id: 1,
    title: "Tim Cook raises salary, fires employees, and eats tacos.",
    img: "https://tickernews.co/wp-content/uploads/2023/01/tin-cook.jpeg",
    rating: 4.5,
    comments: 4,
  },
  {
    id: 2,
    title: "Elon Musk: How I Plan to Colonize Mars with X-AI.",
    img: "https://source.unsplash.com/random/400x200?mars",
    rating: 4.8,
    comments: 12,
  },
  {
    id: 3,
    title: "AI Will Destroy Your Job Unless You Learn This",
    img: "https://source.unsplash.com/random/400x200?ai",
    rating: 4.2,
    comments: 9,
  },
  {
    id: 4,
    title: "The Rise and Fall of Crypto Empires",
    img: "https://source.unsplash.com/random/400x200?crypto",
    rating: 3.7,
    comments: 6,
  },
  {
    id: 5,
    title: "Mark Zuckerberg: How I Built the Metaverse",
    img: "https://source.unsplash.com/random/400x200?meta",
    rating: 4.0,
    comments: 7,
  },
  {
    id: 6,
    title: "Apple Vision Pro: A Peek Into the Future",
    img: "https://source.unsplash.com/random/400x200?apple",
    rating: 4.9,
    comments: 15,
  },
];

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 sm:w-3/4 ">
        {blogData.map((blog) => (
          <div key={blog.id} className="aspect-square">
            <SpotlightCard {...blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
