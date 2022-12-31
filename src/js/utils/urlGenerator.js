export default function urlGenerator(mode) {
    const baseUrl = `https://imdb-api.com/en/API/${mode}/k_mz7kzl4l`;

    return function ({ movieID, requestString, loadMoreItemsQty, startNumber }) {
        if (movieID) return `${baseUrl}/${movieID}/Images`;

        const searchUrl = `${baseUrl}?title=${requestString}&count=${loadMoreItemsQty}`;

        return startNumber ? `${searchUrl}&start=${startNumber}` : searchUrl;
    };
}