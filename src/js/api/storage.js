export const save = (key, item) => {
    if (localStorage) {
        localStorage.setItem(`bussit.${key}`, JSON.stringify(item));
    }
};

export const load = (key) => {
    if (localStorage) {
        const item = localStorage.getItem(`bussit.${key}`);

        if (item) {
            return JSON.parse(item);
        }
    }

    return undefined;
};
