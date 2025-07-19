class ContentApi {
    static async addContent(comicId, chapterId, formData) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("token")
        return fetch(`${apiUrl}/api/admin/comics/${comicId}/chapters/${chapterId}/contents`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
    }
    static async updateContent(comicId, chapterId, contentId, formData) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("token")
        return fetch(`${apiUrl}/api/admin/comics/${comicId}/chapters/${chapterId}/contents/${contentId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
    }
    static async deleteContent(comicId, chapterId, contentId) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("token")
        return fetch(`${apiUrl}/api/admin/comics/${comicId}/chapters/${chapterId}/contents/${contentId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
    static async getAllContentByChapterNumber(comicId, chapterNumber) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/public/comics/${comicId}/chapters/${chapterNumber}/contents`, {
            method: 'GET'
        })
    }
}
export default ContentApi