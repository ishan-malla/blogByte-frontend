import SpotlightCard from "@/components/ui/SpotlightCard";
import BlogTab from "@/components/ui/BlogTab";
import HeadLines from "@/components/HeadLines";

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

const RecentSection = () => {
  return (
    <>
      {/* Main container with proper centering */}
      <div className="w-full flex md:pt-2 justify-center px-4">
        <div className="max-w-7xl w-full flex flex-col sm:flex-row gap-5">
          {/* Main content section */}
          <section className="flex-1 flex flex-col xl:flex-row gap-6">
            <SpotlightCard />
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
          </section>

          {/* Headlines sidebar */}
          <section className="w-full  xl:w-[15.5%] ">
            <HeadLines />
          </section>
        </div>
      </div>

      <hr className="mt-8 w-[78%] mx-auto" />
    </>
  );
};
export default RecentSection;
