export default function cloneObj(obj) {
    if (typeof obj === 'object' &&!Array.isArray(obj)) {
        const newObj = {};

        const keyList = Object.keys(obj);

        keyList.forEach(key => {
            newObj[key] = cloneObj(obj[key]);
        });

        return newObj;
    }else if (Array.isArray(obj)) {
        const newObj = [];

        obj.forEach(item => {
            newObj.push(cloneObj(item));
        });

        return newObj;
    } else {
        return obj;
    }
}