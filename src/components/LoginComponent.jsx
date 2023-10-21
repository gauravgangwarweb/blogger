import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setRegister } from "../redux/reducers/authSlice";
import axios from "axios";
import baseUrl from "../api/baseUrl"
import Cookies from "js-cookie";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router";

const LoginComponent = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
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

        if (name === "email") {
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(value)) {
                setErrors({
                    ...errors,
                    email: "Invalid email address"
                })
            } else {
                setErrors({
                    ...errors,
                    email: ""
                })
            }
        } else if (name === "password") {
            // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (value.length < 8) {
                setErrors({
                    ...errors,
                    password: "Password must be at least 8 characters long"
                })
            } else {
                setErrors({
                    ...errors,
                    password: ""
                })
            }
        }
    }

    const handleLogIn = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const toastId = "login"
        console.log(inputs);
        await axios.post(`${baseUrl}/login`, inputs)
            .then((res) => {
                Cookies.set("token", res.data.token, { expires: 1, sameSite: "strict" })
                Cookies.set('id', res.data.user._id, { expires: 1, sameSite: 'strict' })
                Cookies.set('profileImg', res.data.user.imageUrl, { expires: 1, sameSite: 'strict' })

                toast.success(res.data.msg, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId,
                    transition: Slide
                })
                dispatch(setLogin(true))
                setIsLoading(false)
                setTimeout(() => {
                    navigate("/");
                  }, 1000);
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)

                toast.error(error.response.data.error, {
                    position: toast.POSITION.TOP_CENTER,
                    toastId
                })
            })
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
                    {errors.email && <p className="text-red-600">{errors.email}</p>}
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
                    {errors.password && <p className="text-red-600">{errors.password}</p>}
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