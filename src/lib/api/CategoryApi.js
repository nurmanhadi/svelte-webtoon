class CategoryApi {
    static async addCategory(name) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("token")
        return fetch(`${apiUrl}/api/admin/categories`, {
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
    static async updateCategory(categoryId, name) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("token")
        return fetch(`${apiUrl}/api/admin/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        })
    }
    static async getAllCategory() {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/public/categories`, {
            method: 'GET'
        })
    }
}
export default CategoryApi