class GenreApi {
    static async addGenre(name) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/genres`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        })
    }
    static async deleteGenre(genreId) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/genres/${genreId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
    static async getAllGenre() {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/genres`, {
            method: 'GET'
        })
    }
    static async getById(genreId, page, size) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/genres/${genreId}?page=${page}&size=${size}`, {
            method: 'GET'
        })
    }
}
export default GenreApi