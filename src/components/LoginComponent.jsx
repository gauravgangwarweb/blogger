import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRegister } from "../redux/reducers/authSlice";

const LoginComponent = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const ref = useRef()
    const isInView = useInView(ref)
    const register = useSelector(state => state.auth.register)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    const handleLogIn = () => {
        console.log("Hii");
    }

    const handleClick = () => {
        dispatch(setRegister(false))
    }
    
    return (
        <div
            ref={ref}
            className={register == false ? "hidden" : "flex flex-col"}
        >
            <motion.h2
                className="text-3xl text-center font-black"
                initial={{ y: 50, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : ""}
                transition={{ duration: 1, delay: 0.5 }}
            >
                Login
            </motion.h2>
            <form className="mt-8" onSubmit={handleLogIn}>
                <motion.div
                    className="flex flex-col relative mb-[35px] w-[300px] h-[50px] inputbox"
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : ""}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <input
                        type="text"
                        name="email"
                        required
                        className="input absolute top-0 left-0 w-full border-2 border-solid border-red-600 outline-none bg-none p-[10px] rounded-[10px]"
                        onChange={e => handleChange(e)}
                    />
                    <label>
                        Email
                    </label>
                </motion.div>
                <motion.div
                    className="flex flex-col relative mb-[50px] w-[300px] h-[50px] inputbox"
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : ""}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <input
                        type="password"
                        name="password"
                        required
                        className="input absolute top-0 left-0 w-full border-2 border-solid border-red-600 outline-none bg-none p-[10px] rounded-[10px]"
                        onChange={e => handleChange(e)}
                    />
                    <label>Password</label>
                </motion.div>
                <motion.button
                    className="w-full flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-lg py-2" type="submit"
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : ""}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    {isLoading ? <span class="loader"></span> : "LogIn"}
                </motion.button>
            </form>
            <motion.p
                className="mt-2 text-center justify-center flex gap-2"
                initial={{ y: 50, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : ""}
                transition={{ duration: 1, delay: 0.7 }}
            >
                Don’t have an account yet?
                <span
                    className="text-red-500 cursor-pointer"
                    onClick={handleClick}
                >
                    Register
                </span>
            </motion.p>
        </div>
    );
}

export default LoginComponent;