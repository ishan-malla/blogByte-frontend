import BlogTab from "@/components/ui/BlogTab";
import SpotlightCard from "@/components/ui/SpotlightCard";

const blogData = [
  {
    id: 1,
    title:
      "OpenAI launches new AI model that writes poems while solving bugs in production.",
    img: "https://marketing4ecommerce.net/en/wp-content/uploads/sites/8/2025/02/history-of-openai-how-the-famous-company-that-created-chatgpt-and-dall-e-was-founded-1.jpg",
    rating: 4.8,
    comments: 12,
  },
  {
    id: 2,
    title:
      "Amazon workers protest after Alexa starts giving relationship advice during meetings.",
    img: "https://www.shutterstock.com/image-illustration/seattle-usa-april-5-2023-600nw-2286327737.jpg",
    rating: 4.5,
    comments: 9,
  },
  {
    id: 3,
    title:
      "Apple engineers invent cable that doesn’t tangle – stock price triples overnight.",
    img: "https://cdn.shopify.com/s/files/1/0157/3520/files/GettyImages-1236193308_505783_sizvhl_1e57f170-e80d-4997-a972-77d0a75ddf9e_2048x2048.jpg?v=1666869728",
    rating: 4.9,
    comments: 18,
  },
  {
    id: 4,
    title:
      "Facebook AI accidentally creates new language, users confused but intrigued.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRw6YYGWoBwja3NzRp721IRwZuKoDR4qziFg&s",
    rating: 4.3,
    comments: 5,
  },
];

const MostDisccused = () => {
  return (
    <>
      <h2 className="text-start w-2/3 text-xl font-bold font-slab">
        Most Disccused
      </h2>
      <div className="flex gap-4 flex-col lg:flex-row">
        <SpotlightCard></SpotlightCard>
        <div className="w-full flex flex-col gap-4 border-x">
          {blogData.map((item) => (
            <BlogTab
              key={item.id}
              title={item.title}
              img={item.img}
              rating={item.rating}
              comments={item.comments}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default MostDisccused;
