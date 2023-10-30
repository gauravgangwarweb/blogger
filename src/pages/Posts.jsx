import axios from "axios";
import { useInView } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import baseUrl from "../api/baseUrl"
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Unauthorized from "../components/Unauthorized";
import { useDispatch } from "react-redux";
import { setPost } from "../redux/reducers/postSlice";

const Posts = () => {
    const dispatch = useDispatch()
    const ref = useRef()
    const isInView = useInView(ref)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const id = Cookies.get("id")

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${baseUrl}/posts`)
            .then((res) => {
                setIsLoading(false)
                setData(res.data.data)
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            {   
                id ? 
                <div
                    ref={ref}
                    className="w-full max-h-[calc(100vh-76px)] flex px-20 py-2"
                >
                    <div className="border-r-2 border-black w-3/4 py-4 px-5 flex flex-col gap-4 h-[calc(100vh-76px)] overflow-y-scroll scrollable-container">
                        {isLoading ?
                            <div className="w-full max-h-[calc(100vh-76px)] flex justify-center items-center">
                                <div class="cube-folding">
                                    <span className="leaf1"></span>
                                    <span className="leaf2"></span>
                                    <span className="leaf3"></span>
                                    <span className="leaf4"></span>
                                </div>
                            </div>
                            : data.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white flex w-full px-3 py-3 rounded-lg cursor-pointer"
                                    onClick={() => dispatch(setPost(post.id))}
                                >
                                    <div className="w-2/6">
                                        <img
                                            src={post.imageUrl}
                                            alt={post.publicId}
                                            className="w-full rounded-md"
                                        />
                                    </div>
                                    <div className="w-[calc(100%-33.33%)] px-3 flex flex-col">
                                        <h4 className="text-xl font-medium h-[140px]">{post.title}</h4>
                                        <div className="flex">
                                            <p className="flex items-center">❤️<span className="font-normal text-black">{post.likes.length}</span></p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="w-1/4 flex flex-col justify-start pt-8 px-4 max-h-[calc(100vh-76px)]">
                        <p>Is there any story in your mind let's share it...</p>
                        <Link to="/new-post" className="bg-red-500 hover:bg-red-600 px-4 text-white text-lg py-1 font-semibold rounded-lg w-20 flex justify-center self-center mt-5">Post</Link>
                    </div>
                </div> : 
                <Unauthorized />
            }
        </>
    );
}

export default Posts;