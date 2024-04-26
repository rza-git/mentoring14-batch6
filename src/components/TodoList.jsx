// CLIENT COMPONENT
"use client"
import Link from "next/link"
import { deleteTodo } from "@/fetching/todos"
import { useRouter } from "next/navigation"


// Menerima data todos dari server component
const TodoList = ({todos}) => {
    // ISINYA TABLE DATA
    const router = useRouter();

    const handleDelete = async (id) => {

        await deleteTodo(id)
        router.refresh()
    }

    return (
        <>
            <Link href={"/todos"}>CREATE TODOS</Link>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image URL</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{idx+1}</td>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td><a href={todo.imageUrl}>{todo.imageUrl}</a></td>
                                <td><button type="button" onClick={(e) => handleDelete(todo.id)}>DELETE</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default TodoList;