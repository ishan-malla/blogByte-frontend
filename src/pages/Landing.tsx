import PopularSection from "@/sections/PopularSection";
import RecentSection from "@/sections/RecentSection";

const Landing = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <RecentSection></RecentSection>
      <PopularSection></PopularSection>
    </div>
  );
};
export default Landing;
