import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Home = () => {
    const ref = useRef()
    const isInView = useInView(ref)
    return (
        <div
            ref={ref}
            className="w-full h-[calc(100vh-76px)] flex flex-col justify-center items-center"
        >
            <motion.h3
                className="text-6xl font-semibold exo"
                initial={{ y: 100, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : ""}
                transition={{ duration: 1, delay: 0.5 }}
            >
                Every <span className="text-red-600">story</span> has its own <span className="text-red-600">vibe</span> .
            </motion.h3>
            <motion.p
                className="mt-8 text-2xl pacifico text-red-500"
                initial={{y: 100, opacity: 0}}
                animate={isInView ? {y: 0, opacity: 1} : ""}
                transition={{duration: 1, delay: 0.7}}            
            >
                Do you have something in your mind lets type it .
            </motion.p>
            <motion.button
                className="mt-6 text-xl font-extrabold border-2 border-black px-6 py-2.5 rounded-lg text-black hover:text-white hover:bg-red-600 hover:border-red-600"
                initial={{y: 100, opacity: 0}}
                animate={isInView ? {y: 0, opacity: 1} : ""}
                transition={{duration: 1, delay: 0.8}}
            >
                Let's Post
            </motion.button>
        </div>
    );
}

export default Home;