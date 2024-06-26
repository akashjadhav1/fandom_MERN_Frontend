
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { renderStars } from "@/assets/renderStar";
import MediaOverviewSkeleton from "./MediaOverviewSkeleton";
import useMedia from "@/hooks/useMedia";
import genreData from "@/assets/genre";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";



const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Base URL for TMDb images

function MediaOverview() {
  const { id } = useParams();
  const { media, loading, error } = useMedia(id);

  const token = Cookies.get("authToken");

  if (loading) return <MediaOverviewSkeleton />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className={`flex flex-col md:flex-row w-full max-w-5xl m-auto p-5 shadow-gray-300 shadow-lg rounded`}>
        {media && (
          <>
            <div className={`w-full md:w-1/2 lg:w-1/3}`}>
              <img
                src={`${IMAGE_BASE_URL}${media.poster_path || media.backdrop_path}`}
                alt={media.title || media.name}
                className="object-contain w-full h-auto rounded shadow-gray-600 shadow-lg"
              />
            </div>

            <div className="mt-10 md:mt-0 md:ml-10 w-full md:w-1/2 lg:w-2/3 text-center">
              <h1 className="text-3xl font-bold mb-4">
                {media.title || media.name}
              </h1>
              <hr />
              <p className="lg:text-md mb-4 lg:p-10 pt-5 text-justify">
                {media.overview}
              </p>

              <div className="lg:flex lg:items-center lg:mx-9 lg:mt-5">
                {media.genre_ids.map((genre) => (
                  <Button
                    key={genre}
                    variant="outline"
                    size="sm"
                    className="mx-2 mt-5 border-none shadow-green-300 rounded shadow-md"
                  >
                    {genreData[genre]}
                  </Button>
                ))}
              </div>

              <div className="flex flex-col lg:p-10 md:flex-row lg:justify-between lg:items-center mt-5">
                <div>
                  <p className="text-sm font-semibold mb-2 md:mb-0 text-start">
                    Release Date:{" "}
                    <span className="text-gray-400 ml-2">
                      {media.release_date.substring(0,10)}
                    </span>
                  </p>
                  <div className="flex items-center text-sm font-semibold">
                    Rating:{" "}
                    <span className="flex text-gray-400 ml-2">
                      {renderStars(media.vote_average)}
                    </span>
                  </div>
                </div>
                <div className="lg:mx-3 md:mx-3">
                  <p className=" text-sm font-semibold mb-2 md:mb-0 text-start">
                    Media Type:{" "}
                    <span className="text-gray-400">{media.media_type.toUpperCase()}</span>
                  </p>
                  <p className=" text-sm font-semibold mb-2 md:mb-0 text-start">
                    Popularity:{" "}
                    <span className="text-gray-400">{media.popularity}</span>
                  </p>
                </div>
              </div>
              <div className="mt-5">
              <Link to={token?media.video:"/login"}>
              <Button variant="outline" className="w-full rounded hover:shadow-orange-500 shadow-md hover:border-none">
                  Watch Now
                </Button>
              </Link>
               
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MediaOverview;
