const Headline = ({ headline }) => {
  return (
    <div className="mt-4 flex space-x-2 text-sm w-full  ">
      <span className="font-extrabold w-2 h-1.5 bg-black self-center "></span>
      <p className="tracking-tighter leading-tight w-full">{headline}</p>
    </div>
  );
};
export default Headline;
