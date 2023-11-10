import { useEffect, useState } from "react";
import baseUrl from "../api/baseUrl";
import axios from "axios";
import { useSelector } from "react-redux";
import 'react-quill/dist/quill.snow.css';
import DOMPurify from "dompurify";

const Post = () => {
    const postId = useSelector(state => state.post.postId)
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${baseUrl}/post/${postId}`)
            .then((res) => {
                setIsLoading(false)
                setData(res.data.data)
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)
            })
    }, [])

    const quillConfig = {
        modules: {
            toolbar: false,
        },
        formats: [],
    };

    const editorStyles = {
        border: 'none !important',
    };

    let sanitizedHTML = ""
    if (!isLoading) {
        sanitizedHTML = DOMPurify.sanitize(data.body);
    }
    return (
        <div className="md:px-48 flex flex-col items-center pt-5">
            {
                isLoading ?
                    <p>Loading</p> :
                    <div className="mt-2 w-full flex flex-col items-center pb-10 md:px-0 px-4">
                        <div className="w-full px-36 flex items-center gap-2">
                            <img src={data.userId.imageUrl} alt="avatar" className="w-[45px] rounded-full" />
                            <p className="text-red-500 font-semibold">{data.userId.firstName} {data.userId.lastName}</p>
                        </div>
                        <img src={data.imageUrl} alt="post-thumbnail" className="md:w-3/4 h-[30rem] mt-6" />
                        <h2 className="text-4xl self-start md:px-36 font-medium md:mt-8 mt-4">{data.title}</h2>
                        <div
                            className="max-w-full self-start md:px-36 md:mt-10 mt-4"
                            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                        />
                    </div>
            }
        </div>
    );
}

export default Post;