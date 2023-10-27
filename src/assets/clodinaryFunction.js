import axios from "axios"

const cloudName = import.meta.env.VITE_CLOUD_NAME
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET
const apiKey = import.meta.env.VITE_API_KEY
const apiSecret = import.meta.env.VITE_API_SECRET

export const imageUpload = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', upload_preset)
    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        )
        console.log(response);
        const data = {
            url: response.data.url,
            publicId: response.data.public_id
        }
        return data
    } catch (error) {
        console.log("Error while uploading")
    }
}
