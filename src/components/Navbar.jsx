import { motion, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Navbar = () => {
    const location = useLocation()
    const [loginPage, setLoginPage] = useState(false)
    const image = ""

    useEffect(() => {
        if (location.pathname === "/login") {
            setLoginPage(true);
        } else {
            setLoginPage(false);
        }
    }, [location.pathname]);

    return (
        <motion.div
            className="w-full h-[76px] px-14 py-5 bg-white flex justify-between items-center"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h4 className="text-3xl pacifico font-extrabold">Blogger</h4>
            {
                image ?
                    <img src="avtar.jpeg" alt="avatar" /> :
                    (loginPage ? <p>Excited..</p> : <Link to="/login" className="bg-red-500 hover:bg-red-600 px-4 text-white text-lg py-1 font-semibold rounded-lg">Login</Link>)
            }
        </motion.div>
    );
}

export default Navbar;