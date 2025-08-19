import CommentSection from "@/components/CommentSection";
import { useParams } from "react-router-dom";
const BlogPost = () => {
  const rating = 4;

  const { id } = useParams();
  console.log(id);
  return (
    <article className="flex flex-col items-center px-4 md:px-0">
      <header className="flex flex-col gap-2 w-full  md:w-1/2">
        <figure>
          <img
            src="https://tickernews.co/wp-content/uploads/2023/01/tin-cook.jpeg"
            alt="Tim Cook"
            className="w-full object-cover"
          />
          <figcaption className="sr-only">Tim Cook at a press event</figcaption>
        </figure>

        <h1 className="text-2xl font-domine font-semibold mt-4">
          Tim Cook to raise his salary and fire lots of employees and eat food
          with that money.
        </h1>

        {/* Author + Rating Section */}
        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          {/* Author */}
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Author"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>
              By <strong>John Appleseed</strong>
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < rating ? "⭐" : "☆"}</span>
            ))}
            <span className="ml-1 text-gray-500">({rating}/5)</span>
          </div>
        </div>
      </header>

      <section className="w-full md:w-1/2 mt-4 text-base leading-7 text-gray-700 font-baskerville tracking-tight">
        <p>
          In a surprising move that has sent shockwaves through the tech
          industry, Apple CEO Tim Cook has announced plans to substantially
          increase his salary, allegedly funded by a controversial wave of
          layoffs. According to unnamed sources, Cook plans to celebrate this
          change with an extravagant culinary tour featuring the world’s most
          expensive foods, from gold-coated truffle burgers to diamond-infused
          sushi.
        </p>
        <p className="mt-4">
          While Apple spokespeople declined to comment, internal memos suggest
          that this decision is part of a broader effort to “streamline
          innovation and optimize fiscal sustainability.” Critics, however, see
          it as a dystopian example of late-stage capitalism, where the few
          feast while the many are left to update their resumes. As the story
          develops, shareholders remain oddly enthusiastic, and Tim Cook was
          last seen boarding a jet to Tokyo with a fork in hand.
        </p>
        <p className="mt-4">
          While Apple spokespeople declined to comment, internal memos suggest
          that this decision is part of a broader effort to “streamline
          innovation and optimize fiscal sustainability.” Critics, however, see
          it as a dystopian example of late-stage capitalism, where the few
          feast while the many are left to update their resumes. As the story
          develops, shareholders remain oddly enthusiastic, and Tim Cook was
          last seen boarding a jet to Tokyo with a fork in hand. While Apple
          spokespeople declined to comment, internal memos suggest that this
          decision is part of a broader effort to “streamline innovation and
          optimize fiscal sustainability.” Critics, however, see it as a
          dystopian example of late-stage capitalism, where the few feast while
          the many are left to update their resumes. As the story develops,
          shareholders remain oddly enthusiastic, and Tim Cook was last seen
          boarding a jet to Tokyo with a fork in hand. While Apple spokespeople
          declined to comment, internal memos suggest that this decision is part
          of a broader effort to “streamline innovation and optimize fiscal
          sustainability.” Critics, however, see it as a dystopian example of
          late-stage capitalism, where the few feast while the many are left to
          update their resumes. As the story develops, shareholders remain oddly
          enthusiastic, and Tim Cook was last seen boarding a jet to Tokyo with
          a fork in hand.
        </p>

        <p className="mt-4">
          While Apple spokespeople declined to comment, internal memos suggest
          that this decision is part of a broader effort to “streamline
          innovation and optimize fiscal sustainability.” Critics, however, see
          it as a dystopian example of late-stage capitalism, where the few
          feast while the many are left to update their resumes. As the story
          develops, shareholders remain oddly enthusiastic, and Tim Cook was
          last seen boarding a jet to Tokyo with a fork in hand.
        </p>

        <p className="mt-4">
          While Apple spokespeople declined to comment, internal memos suggest
          that this decision is part of a broader effort to “streamline
          innovation and optimize fiscal sustainability.” Critics, however, see
          it as a dystopian example of late-stage capitalism, where the few
          feast while the many are left to update their resumes. As the story
          develops, shareholders remain oddly enthusiastic, and Tim Cook was
          last seen boarding a jet to Tokyo with a fork in hand. While Apple
          spokespeople declined to comment, internal memos suggest that this
          decision is part of a broader effort to “streamline innovation and
          optimize fiscal sustainability.” Critics, however, see it as a
          dystopian example of late-stage capitalism, where the few feast while
          the many are left to update their resumes. As the story develops,
          shareholders remain oddly enthusiastic, and Tim Cook was last seen
          boarding a jet to Tokyo with a fork in hand. While Apple spokespeople
          declined to comment, internal memos suggest that this decision is part
          of a broader effort to “streamline innovation and optimize fiscal
          sustainability.” Critics, however, see it as a dystopian example of
          late-stage capitalism, where the few feast while the many are left to
          update their resumes. As the story develops, shareholders remain oddly
          enthusiastic, and Tim Cook was last seen boarding a jet to Tokyo with
          a fork in hand.
        </p>
      </section>
      <CommentSection></CommentSection>
    </article>
  );
};

export default BlogPost;
