const events = {};

export const emit = (event, data) => {
    const ev = events[event] || [];
    
    ev.map((callback) => callback(data));
};

export const on = (event, callback) => {
    events[event] = events[event] || [];

    return events[event].push(callback);
};
