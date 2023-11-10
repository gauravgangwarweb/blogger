import { motion, useInView } from "framer-motion";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Navbar = () => {
    const location = useLocation()
    const [pathname, setPathname] = useState(false)
    const image = Cookies.get("profileImg")
    
    useEffect(() => {
        if (location.pathname === "/login") {
            setPathname("login");
        } else if(location.pathname === "/posts") {
            setPathname("posts");
        } else {
            setPathname("/")
        }
    }, [location.pathname]);

    return (
        <motion.div
            className="w-full h-[76px] md:px-14 px-2 py-5 bg-white flex justify-between items-center"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Link to="/posts" className="text-3xl pacifico font-extrabold">Blogger</Link>
            <div className="flex justify-center items-center gap-4">
            {
                pathname == "posts" ? <Link to="/new-post" className="bg-red-500 hover:bg-red-600 px-4 text-white text-lg py-1 font-semibold rounded-lg md:hidden">Post</Link> : <p></p>
            }
            {
                image ?
                    <img src="avtar.jpeg" alt="avatar" className="w-[45px] rounded-full" /> :
                    (pathname == "login" ? <p>Excited..</p> : <Link to="/login" className="bg-red-500 hover:bg-red-600 px-4 text-white text-lg py-1 font-semibold rounded-lg">Login</Link>)
            }
            </div>
        </motion.div>
    );
}

export default Navbar;