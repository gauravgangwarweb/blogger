import axios from "axios";
import { useInView } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import baseUrl from "../api/baseUrl"
import { Link } from "react-router-dom";

const Posts = () => {
    const ref = useRef()
    const isInView = useInView(ref)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const demo = {
        _id: "651c39c6887fa2d9d4d00c39",
        title: "It can't be easier to have the alone feeling",
        publicId: "new-coin_r7adoz",
        imageUrl: "http://res.cloudinary.com/dz27v8vsy/image/upload/v1696348603/new-coin_r7adoz.png",
        userId: "65194b73ddef4b7c4b58d267",
        body: "<p>demo 1</p>",
        likes: [],
    }

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
        <div
            ref={ref}
            className="w-full max-h-[calc(100vh-76px)] flex px-20 py-2"
        >
            <div className="border-r-2 border-black w-3/4 py-4 px-5 flex flex-col gap-4 max-h-[calc(100vh-76px)] overflow-y-auto scrollable-container">
                <div
                    className="bg-white flex w-full px-3 py-3 rounded-lg"
                >
                    <div className="w-2/6">
                        <img
                            src={demo.imageUrl}
                            alt={demo.publicId}
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className="w-[calc(100%-33.33%)] px-3 flex flex-col">
                        <h4 className="text-xl font-medium h-[140px]">{demo.title}</h4>
                        <div className="flex">
                            <p className="flex items-center">❤️<span className="font-normal text-black">5</span></p>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white flex w-full px-3 py-3 rounded-lg"
                >
                    <div className="w-2/6">
                        <img
                            src={demo.imageUrl}
                            alt={demo.publicId}
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className="w-[calc(100%-33.33%)] px-3 flex flex-col">
                        <h4 className="text-xl font-medium h-[140px]">{demo.title}</h4>
                        <div className="flex">
                            <p className="flex items-center">❤️<span className="font-normal text-black">5</span></p>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white flex w-full px-3 py-3 rounded-lg"
                >
                    <div className="w-2/6">
                        <img
                            src={demo.imageUrl}
                            alt={demo.publicId}
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className="w-[calc(100%-33.33%)] px-3 flex flex-col">
                        <h4 className="text-xl font-medium h-[140px]">{demo.title}</h4>
                        <div className="flex">
                            <p className="flex items-center">❤️<span className="font-normal text-black">5</span></p>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white flex w-full px-3 py-3 rounded-lg"
                >
                    <div className="w-2/6">
                        <img
                            src={demo.imageUrl}
                            alt={demo.publicId}
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className="w-[calc(100%-33.33%)] px-3 flex flex-col">
                        <h4 className="text-xl font-medium h-[140px]">{demo.title}</h4>
                        <div className="flex">
                            <p className="flex items-center">❤️<span className="font-normal text-black">5</span></p>
                        </div>
                    </div>
                </div>
                <div
                    className="bg-white flex w-full px-3 py-3 rounded-lg"
                >
                    <div className="w-2/6">
                        <img
                            src={demo.imageUrl}
                            alt={demo.publicId}
                            className="w-full rounded-md"
                        />
                    </div>
                    <div className="w-[calc(100%-33.33%)] px-3 flex flex-col">
                        <h4 className="text-xl font-medium h-[140px]">{demo.title}</h4>
                        <div className="flex">
                            <p className="flex items-center">❤️<span className="font-normal text-black">5</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/4 flex flex-col justify-start pt-8 px-4 max-h-[calc(100vh-76px)]">
                <p>Is there any story in your mind let's share it...</p>
                <Link className="bg-red-500 hover:bg-red-600 px-4 text-white text-lg py-1 font-semibold rounded-lg w-20 flex justify-center self-center mt-5">Post</Link>
            </div>
        </div>
    );
}

export default Posts;