"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createTodo } from "@/fetching/todos"

export default function CreateTodo() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const router = useRouter();

    const handleCreate = async () => {

        await createTodo({title, description})
        router.push("/")
    }

    return (
        <div>
            <input style={{display: "block", marginBottom: "2px", padding: "5px"}} type="text" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} />
            <input style={{display: "block", marginBottom: "2px", padding: "5px"}} type="text" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
            <button type="button" onClick={handleCreate}>SUBMIT</button>
        </div>
    )

}