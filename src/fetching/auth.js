import BASE_URL from "@/lib/baseUrl"

export const login = async (params) => {

    try {

        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            body: JSON.stringify(params)
        })
        
        
        return response;
    } catch(err) {
        throw new Error({message: err.response.message})
    }
}