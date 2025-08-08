import { Link } from "react-router-dom";
import Headline from "./ui/Headline";

const headlines = [
  "Elon Musk Announces New Language: Tweetish, to Replace English on X",
  "YouTube Now Auto-Skips to the Comment Section, Viewers Celebrate",
  "New AI CEO Hired by Mistake, Company Profits Triple in First Week",
  "Instagram Adds 'Overthink Filter' for People Who Reread Texts 5 Times",
  "Microsoft Word Finally Adds Button That Just Finishes the Essay for You",
  "Google Maps Introduces 'Emotional Route' Avoids Places with Bad Memories",
  "TikTok Users Can Now Upload Thoughts Directly from Brain in Beta Test",
  "Spotify Wrapped Now Includes 'Breakup Songs You Lied About Not Crying To'",
];
const HeadLines = () => {
  return (
    <div className="w-full ">
      <div className="flex w-full text-sm font-medium justify-between">
        <h4 className="font-semibold tracking-wide text-xs">HEADLINES </h4>
        <Link to={"/home"} className="text-gray-600 pt-0.5">
          See all
        </Link>
      </div>
      {headlines.map((headline, index) => {
        return (
          <div className="flex flex-col w-full  " key={index}>
            <Headline headline={headline}></Headline>
          </div>
        );
      })}
    </div>
  );
};
export default HeadLines;
