import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router";
import { imageUpload } from "../assets/clodinaryFunction";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import baseUrl from "../api/baseUrl";

function NewPost() {
    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "",
        publicId: "",
        body: "",
        userId: ""
    })
    console.log(formData)
    const [isLoading, setIsLoading] = useState(false)
    const token = Cookies.get("token") || undefined;
    const navigate = useNavigate();

    const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0]
        const data = await imageUpload(file)
        console.log(data)
        if(data){
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
        console.log(formData);

        if(!postData.title || !postData.publicId || !postData.imageUrl || !postData.userId || !postData.body){
            setIsLoading(false)
            toast.error("Some of the post fields are empty. Please fill in all required fields.", {
                position: toast.POSITION.TOP_CENTER,
                toastId
            })
        } else {
            await axios.post(`${baseUrl}/post/new`, formData, {
                headers: {
                    Authorization: token,
                }
            })
        }
    }

    return (
        <div
        className="w-full h-[calc(100vh-76px)]"
        >
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
                        onChange={(e) => { setFormData({
                            ...formData,
                            title: e.target.value
                        }) }}
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
    );
}

export default NewPost;