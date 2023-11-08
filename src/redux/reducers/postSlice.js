import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        postId: "653e1ebd5980adbf024f957b"
    },
    reducers: {
        setPost: (state, link) => {
            state.postId = link.payload
        }
    }
})

export const {setPost} = postSlice.actions

export default postSlice.reducer