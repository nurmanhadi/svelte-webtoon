class ChapterApi {
    static async addChapter(comicId, number) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("token")
        return fetch(`${apiUrl}/api/admin/comics/${comicId}/chapters`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                number: number
            })
        })
    }
    static async updateChapter(comicId, chapterId, number) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("token")
        return fetch(`${apiUrl}/api/admin/comics/${comicId}/chapters/${chapterId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                number: number
            })
        })
    }
    static async getallChapterByComicId(comicId) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/public/comics/${comicId}/chapters`, {
            method: 'GET'
        })
    }
}
export default ChapterApi