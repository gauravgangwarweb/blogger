import { motion, useInView } from "framer-motion";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [pathname, setPathname] = useState(false)
    const image = Cookies.get("profileImg")

    useEffect(() => {
        if (location.pathname === "/login") {
            setPathname("login");
        } else if (location.pathname === "/posts") {
            setPathname("posts");
        } else {
            setPathname("/")
        }
    }, [location.pathname]);

    const handleLogOut = (e) => {
        e.preventDefault()
        Cookies.remove("token")
        Cookies.remove('id')
        Cookies.remove('profileImg')
        navigate("/")
    }

    return (
        <motion.div
            className="w-full h-[76px] md:px-14 px-2 py-5 bg-white flex justify-between items-center"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {image ?
                <Link to="/posts" className="text-3xl pacifico font-extrabold">Blogger</Link> :
                <Link to="/" className="text-3xl pacifico font-extrabold">Blogger</Link>
            }
            <div className="flex justify-center items-center gap-4">
                {
                    pathname == "posts" ? <Link to="/new-post" className="bg-red-500 hover:bg-red-600 px-4 text-white text-lg py-1 font-semibold rounded-lg md:hidden">Post</Link> : <p></p>
                }
                {
                    image ?
                        <button
                            className="bg-red-500 hover:bg-red-600 px-4 text-white text-lg py-1 font-semibold rounded-lg"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </button> :
                        (pathname == "login" ? <p>Excited..</p> :
                            <Link
                                to="/login"
                                className="bg-red-500 hover:bg-red-600 px-4 text-white text-lg py-1 font-semibold rounded-lg"
                            >
                                Login
                            </Link>)
                }
            </div>
        </motion.div>
    );
}

export default Navbar;