export const getToken = (url) => {
    const token = url.split('=')[1].split('&')[0];
    return token;
}