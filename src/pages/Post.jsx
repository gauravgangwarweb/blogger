import { useEffect, useState } from "react";
import baseUrl from "../api/baseUrl";
import axios from "axios";
import { useSelector } from "react-redux";
import 'react-quill/dist/quill.snow.css';
import DOMPurify from "dompurify";

const Post = () => {
    const postId = useSelector(state => state.post.postId)
    console.log(postId);
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
                    <div className="mt-2 w-full flex flex-col items-center pb-10">
                        <img src={data.imageUrl} alt="post-thumbnail" className="w-3/4" />
                        <h2 className="text-4xl self-start px-36 font-medium mt-8">{data.title}</h2>
                        <div
                            className="max-w-full self-start px-36 mt-10"
                            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                        />
                    </div>
            }
        </div>
    );
}

export default Post;