export const sameKeys = (obj1: Record<string, any>, obj2: Record<string, any>) =>
    obj1 ? Object.keys(obj1).sort().join() === Object.keys(obj2).sort().join() : false