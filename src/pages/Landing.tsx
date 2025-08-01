import MostDisccused from "@/sections/MostDisccused";
import PopularSection from "@/sections/PopularSection";
import RecentSection from "@/sections/RecentSection";

const Landing = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <RecentSection></RecentSection>
      <PopularSection></PopularSection>
      <MostDisccused></MostDisccused>
    </div>
  );
};
export default Landing;
