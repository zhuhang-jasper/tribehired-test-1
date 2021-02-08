/* --------------------- */
/* Utility : Object    */
/* --------------------- */

module.exports = { isObject, isEmpty, deepMerge };

/**
 * Simple object check.
 * @param item object
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === "object" && !Array.isArray(item));
}

/**
 * Simple object check if empty.
 * @param obj object
 * @returns {boolean}
 */
function isEmpty(obj = null) {
    return (obj == null || (Object.keys(obj).length === 0 && obj.constructor === Object));
}

/**
 * Similar to Object.assign() but deep merge.
 * @param target target object
 * @param sources objects to be merged
 */
function deepMerge(target, ...sources) {
    if (!sources.length) { return target; }
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) { Object.assign(target, { [key]: {} }); }
                deepMerge(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return deepMerge(target, ...sources);
}
