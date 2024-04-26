"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createTodo, uploadImage } from "@/fetching/todos"

export default function CreateTodo() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const router = useRouter();

    const handleCreate = async () => {

        await createTodo({title, description, imageUrl})
        router.refresh()
        router.push("/")
    }

    const handleImageUrl = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();

        formData.append('image', image);

        const response = await uploadImage(formData);
        
        if(response.image_url) {
            setImageUrl(response.image_url)
        }
    }

    return (
        <div>
            <input style={{display: "block", marginBottom: "2px", padding: "5px"}} type="text" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
            <input style={{display: "block", marginBottom: "2px", padding: "5px"}} type="text" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
            <input style={{display: "block", marginBottom: "2px", padding: "5px"}} type="file" placeholder="Enter Image" onChange={(e) => handleImageUrl(e)}/>
            <button type="button" onClick={handleCreate}>SUBMIT</button>
        </div>
    )

}