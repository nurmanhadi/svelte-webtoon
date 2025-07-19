class ComicCategoryApi {
    static async addComicCategory(comicId, categoryId) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("token")
        return fetch(`${apiUrl}/api/admin/comic-categories`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comicId: comicId,
                categoryId: categoryId
            })
        })
    }
    static async deleteComicCategory(comicCategoryId) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("token")
        return fetch(`${apiUrl}/api/admin/comic-categories/${comicCategoryId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
    static async getAllByCategoryId(categoryId, page, size) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/public/comic-categories/categories/${categoryId}?page=${page}&size=${size}`, {
            method: 'GET'
        })
    }
}

export default ComicCategoryApi