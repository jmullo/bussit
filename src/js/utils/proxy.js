export const createProxy = (target, handler) => {
    return window.Proxy ? new Proxy(target, handler)
                        : createPolyfill(target, handler);
}

const createPolyfill = (target, handler) => {
    let proxy = {};

    const getter = function(property) {
        return this[property];
    };

    const setter = function(property, value) {
        handler.set(this, property, value, proxy);
    };

    Object.setPrototypeOf(proxy, Object.getPrototypeOf(target));

    Object.getOwnPropertyNames(target).forEach((property) => {
        const descriptor = Object.getOwnPropertyDescriptor(target, property);

        Object.defineProperty(proxy, property, {
            enumerable: descriptor.enumerable,
            get: getter.bind(target, property),
            set: setter.bind(target, property)
        });
    });

    return proxy;
};
