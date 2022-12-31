export function debounce(fn, wait = 500) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => { fn.apply(this, arguments); }, wait);
    };
}

export function throttleOnce(fn, wait) {
    let isInWaiting = false;

    return function () {
        if (isInWaiting) return;

        isInWaiting = true;
        fn.apply(this, arguments);
        setTimeout(() => { isInWaiting = false; }, wait);
    };
}