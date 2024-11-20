function getCookie(name: string): string | null {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split('=');
        if (key === name) {
            return decodeURIComponent(value || '');
        }
    }
    return null;
}

export const setAuthCookie = (token: String) => {
    document.cookie = `jwt=${token}; path=/; max-age=${60 * 15}; secure; samesite=strict`;
};

export const authCookie = () => {
    return getCookie("jwt")
}
