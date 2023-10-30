import axios from "axios"

export const imageUpload = async (file) => {
    let body = new FormData()
    body.set("key", "95338f310e1517174c26d51f186c9e6e")
    body.append("image", file)

    try{
        const response = await axios.post(
            "https://api.imgbb.com/1/upload",
            body
        )
        const data = {
            url: response.data.data.display_url,
            publicId: response.data.data.image.name,
        }
        console.log(data)
        return data
    }
    catch(error){
        console.log(error);
    }
}