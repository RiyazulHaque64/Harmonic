import { Link, useRouteError } from "react-router-dom";
import errImg from "../../assets/image/error.png";
const ErrorPage = () => {
  const error = useRouteError();
  const { status, statusText } = error;
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white p-10 rounded-lg flex flex-col items-center justify-center">
        <img src={errImg} alt="" />
        <h4 className="text-extrabold text-3xl text-red-600 mt-4 mb-2">
          {status} - <span>{statusText}</span>!!!
        </h4>
        <p>{error.data}</p>
        <Link to="/">
          <button className="bg-lime-500 duration-300 hover:bg-lime-600 py-2 px-4 rounded-lg text-white font bold mt-4">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
