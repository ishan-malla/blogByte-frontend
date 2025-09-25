import { Link } from "react-router-dom";
import Headline from "./ui/Headline";
import { useGetPostsQuery } from "@/features/postApi";

const HeadLines = () => {
  const { data: posts = [] } = useGetPostsQuery();

  return (
    <div className="w-full ">
      <div className="flex w-full text-sm font-medium justify-between">
        <h4 className="font-semibold tracking-wide text-xs">HEADLINES </h4>
        <Link to={"/home"} className="text-gray-600 pt-0.5">
          See all
        </Link>
      </div>
      {posts.map((post, index) => {
        return (
          <div className="flex flex-col w-full  " key={index}>
            <Headline headline={post.title}></Headline>
          </div>
        );
      })}
    </div>
  );
};
export default HeadLines;
