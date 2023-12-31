import { useRef } from "react";
import LoginComponent from "../components/LoginComponent";
import { motion, useInView } from "framer-motion";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RegisterComponent from "../components/RegisterComponent";
import Cookies from "js-cookie";

const Login = () => {
    const ref = useRef()
    const isInView = useInView(ref)
    const user = Cookies.get("id")

    return (
        <div
            ref={ref}
            className="w-full h-[calc(100vh-76px)] flex m-0 p-0 relative center"
        >
            <div className="toast-container"><ToastContainer limit={1} /></div>
            <motion.div
                className="hidden md:block md:w-2/3 bg-[url('https://res.cloudinary.com/dz27v8vsy/image/upload/v1689484277/blog-log_fhm2yc.png')] bg-cover bg-center bg-no-repeat"
                initial={{y: 5, opacity: 0}}
                animate={isInView ? {y: 0, opacity: 1} : ""}
                transition={{delay: 0.5}}
            >
            </motion.div>
            <div className={user ? "w-full md:w-1/3 flex flex-col justify-center items-center": "hidden"}>
                <p>You are already logged in</p>
            </div>
            <div className={!user ? "w-full md:w-1/3 flex flex-col justify-center items-center" : "hidden"}>
                <LoginComponent />
                <RegisterComponent />
            </div>
        </div>
    );
}

export default Login;