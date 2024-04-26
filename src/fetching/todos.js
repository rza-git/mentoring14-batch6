import BASE_URL from "@/lib/baseUrl";

export const deleteTodo = async (id) => {
    try {

        const response = await fetch(`${BASE_URL}/todos/${id}`, {
            method: "DELETE"
        })

        return response;
    } catch(err) {
        throw new Error({message: err.response.message})
    }
}

export const createTodo = async (params) => {

    try {

        const response = await fetch(`${BASE_URL}/todos`, {
            method: "POST",
            body: JSON.stringify(params)
        })

        return response
    } catch(err) {
        throw new Error({message: err.response.message})
    }
}

export const uploadImage = async (params) => {

    try {   
        const response = await fetch(`${BASE_URL}/todos/uploads`, {
            method: "POST",
            body: params
        })
        
        const data = await response.json();

        return data
    } catch(err) {
        throw new Error({message: err.response.message || "Internal Server Error"})
    }
}