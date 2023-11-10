import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router";
import { imageUpload } from "../assets/clodinaryFunction";
import { Slide, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import baseUrl from "../api/baseUrl";
import { useEffect } from "react";

function NewPost() {
    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        publicId: "",
        userId: "",
        body: "",
        token: Cookies.get("token") || undefined
    })
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState(undefined)
    const user = Cookies.get("id") || undefined
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get("token") || undefined;
        setToken(token)
        if (user) {
            setFormData({
                ...formData,
                userId: user
            })
        }
    }, [])

    const handleImageUpload = async (e) => {
        e.preventDefault();
        console.log("Hiii")
        const file = e.target.files[0]
        const data = await imageUpload(file)
        if (data) {
            console.log(data)
            setFormData({
                ...formData,
                imageUrl: data.url,
                publicId: data.publicId
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const toastId = "post"

        if (!formData.title || !formData.publicId || !formData.imageUrl || !formData.userId || !formData.body) {
            setIsLoading(false)
            toast.error("Some of the post fields are empty. Please fill in all required fields.", {
                position: toast.POSITION.TOP_CENTER,
                toastId
            })
        } else {
            await axios.post(`${baseUrl}/post/new`, formData)
                .then((res) => {
                    setIsLoading(false)
                    console.log(res);
                    toast.success(res.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        toastId,
                        transition: Slide
                    })
                    setTimeout(() => {
                        navigate("/posts")
                    }, 500)
                })
                .catch((error) => {
                    console.error(error)
                    setIsLoading(false)
                    toast.error(error, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId
                    })
                })
        }
    }
    console.log(formData)
    return (
        <div
            className="w-full h-[calc(100vh-76px)]"
        >
            <div className="md:hidden h-[calc(100vh-76px)] w-full flex justify-center items-center">
                <h5 className="text-center text-3xl font-bold px-2">Sorry but you can't post as your device <span className="text-red-500">not supports</span> our editor.</h5>
            </div>
            <div className="md:block hidden">
                <div className="toast-container"><ToastContainer limit={1} /></div>
                <div className="pt-20 px-8 gap-2 flex flex-col items-center">
                    <div className="w-3/4 flex px-20 border-2 border-dashed border-black py-10">
                        {
                            !formData.imageUrl ?
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="items-start justify-start"
                                /> :
                                <img src={formData.imageUrl} alt="uploaded image" className="w-32" />
                        }
                    </div>
                    <form className="w-3/4 flex flex-col gap-5 px-20 border-2 border-black py-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            className="text-4xl border placeholder:pl-1 crimson w-full px-2 py-1"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    title: e.target.value
                                })
                            }}
                        />
                        <div className="border-black border w-full">
                            <ReactQuill
                                value={formData.body}
                                onChange={value => setFormData({
                                    ...formData,
                                    body: value
                                })}
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, false] }],
                                        [{ font: [] }, { size: [] }, 'bold', 'italic', 'underline', 'strike', 'blockquote', { color: [] }],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, 'code-block', 'blockquote'],
                                        ['link', 'image'],
                                        ['clean']
                                    ]
                                }}
                                theme="snow"
                                placeholder="Add your Story"
                            />
                        </div>
                        <button onClick={handleSubmit} className="bg-red-500 w-36 self-end text-white py-1 text-lg font-bold rounded-lg">Post</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default NewPost;