export function sortArrayOfObjects<T extends Record<K, string>, K extends keyof T>(arr: T[], key: K): T[] {
    return arr.sort((a, b) => a[key].localeCompare(b[key]));
}

export function updateArrayWithObject<T>(array: T[], objectToUpdate: T, updatedValue: Partial<T>): T[] {
    const updatedArray = array.map((obj) => (obj === objectToUpdate ? { ...obj, ...updatedValue } : obj));
    return updatedArray;
}
