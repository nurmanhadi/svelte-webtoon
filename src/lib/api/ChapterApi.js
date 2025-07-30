class ChapterApi {
    static async addChapter(comicId, chapterNumber) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/comics/${comicId}/chapters`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comic_id: comicId,
                number: chapterNumber
            })
        })
    }
    static async deleteChapter(comicId, chapterId) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/comics/${comicId}/chapters/${chapterId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
    }
    static async publishChapter(comicId, chapterId, chapterPublish) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/comics/${comicId}/chapters/${chapterId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                publish: chapterPublish
            })
        })
    }
    static async getChapter(comicId, chapterNumber) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/comics/${comicId}/chapters/${chapterNumber}`, {
            method: 'GET'
        })
    }
}
export default ChapterApi