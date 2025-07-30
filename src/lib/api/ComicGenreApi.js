class ComicGenreApi {
    static async addComicGenre(comicId, genreId) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/comic-genre`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comic_id: comicId,
                genre_id: genreId
            })
        })
    }
    static async deleteComicGenre(comicId, genreId) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/comic-genre/comics/${comicId}/genres/${genreId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
}

export default ComicGenreApi