class UserApi {
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
}
export default UserApi