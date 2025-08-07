class DashboardApi {
    static async getSummary() {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/dashboard/summary`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }
}

export default DashboardApi