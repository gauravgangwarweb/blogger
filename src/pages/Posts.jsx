import { useInView } from "framer-motion";
import { useRef } from "react";

const Posts = () => {
    const ref = useRef()
    const isInView = useInView(ref)
    return (
        <div 
        ref={ref}
        className="red w-full h-[calc(100vh-76px)]"
        >
            
        </div>
    );
}

export default Posts;