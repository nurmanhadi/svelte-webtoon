class AuthApi {
    static async login({ username, password }) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
    }
    static async register({ username, password }) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
    }
}

export default AuthApi