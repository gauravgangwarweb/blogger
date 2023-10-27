import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Home = () => {
    const user = Cookies.get("profileImg")

    return (
        <div className="w-full h-[calc(100vh-76px)] flex flex-col justify-center items-center">
            <h3 className="text-6xl font-semibold exo">Every <span className="text-red-600">story</span> has its own <span className="text-red-600">vibe</span> .</h3>
            <p className="mt-8 text-2xl pacifico text-red-500">Do you have something in your mind lets type it .</p>
            {
                user ?
                    <Link to="/posts" className="mt-6 text-xl font-extrabold border-2 border-black px-6 py-2.5 rounded-lg text-black hover:text-white hover:bg-red-600 hover:border-red-600">
                        Let's Read
                    </Link> :
                    <Link to="/login" className="mt-6 text-xl font-extrabold border-2 border-black px-6 py-2.5 rounded-lg text-black hover:text-white hover:bg-red-600 hover:border-red-600">
                        Let's Post
                    </Link>
            }
        </div>
    );
}

export default Home;