class UserApi {
    static async getById(userId) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/users/${userId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
    static async uploadAvatar(userId, formdata) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/users/${userId}/upload`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formdata
        })
    }
    static async updateUsername(userId, username) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username
            })
        })
    }
}
export default UserApi