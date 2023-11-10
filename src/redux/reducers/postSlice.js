import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        postId: "654df7717e799525fa51fac9"
    },
    reducers: {
        setPost: (state, link) => {
            state.postId = link.payload
        }
    }
})

export const {setPost} = postSlice.actions

export default postSlice.reducer