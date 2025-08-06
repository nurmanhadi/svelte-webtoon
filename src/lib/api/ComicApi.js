class ComicApi {
    static async addComic(formdata) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/comics`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formdata
        })
    }
    static async updateComic(comicId, formdata) {
        const apiUrl = import.meta.env.VITE_API_URL
        const token = localStorage.getItem("access_token")
        return fetch(`${apiUrl}/api/comics/${comicId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formdata
        })
    }
    static async getAllComic(page, size) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/comics?page=${page}&size=${size}`, {
            method: 'GET'
        })
    }
    static async getAllComicByViewsByPeriod(timePeriod, limit) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/comics/period/${timePeriod}?limit=${limit}`, {
            method: 'GET'
        })
    }
    static async getAllComicByType(comicType, page, size) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/comics/type/${comicType}?page=${page}&size=${size}`, {
            method: 'GET'
        })
    }
    static async getComicById(comicId) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/comics/${comicId}`, {
            method: 'GET'
        })
    }
    static async searchComic(keyword, page, size) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/search?keyword=${keyword}&page=${page}&size=${size}`, {
            method: 'GET'
        })
    }
    static async updateViews(comicId, views) {
        const apiUrl = import.meta.env.VITE_API_URL
        return fetch(`${apiUrl}/api/comics/${comicId}/views/${views}`, {
            method: 'PUT'
        })
    }
}
export default ComicApi