import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="w-full  h-screen flex flex-col items-center justify-center gap-3">
        <div className="h-40 flex items-center">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="page not found"
          />
        </div>
        <h3 className="text-3xl font-semibold mt-16">Looks like you're lost</h3>
        <p className="-mt-2">
          Oops! The page are looking for is not available or some seems to be
          wrong.
        </p>
        <Link to="/">
          <span className="block bg-indigo-600 px-8 py-3 text-white font-medium mt-4 rounded-md hover:bg-indigo-700 hover:cursor-pointer transition-all duration-300">
            Go back to home
          </span>
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;