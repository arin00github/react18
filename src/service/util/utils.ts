/**
 * @name sortArrayOfObjects
 * @param arr sort 대상 배열
 * @param key sort 시킬 데이터 key 값
 * @returns sort된 배열
 */
export function sortArrayOfObjects<T extends Record<K, string>, K extends keyof T>(arr: T[], key: K): T[] {
    return arr.sort((a, b) => a[key].localeCompare(b[key]));
}

/**
 * @name updateArrayWithObject
 * @param array 업데이트 시킬 배열
 * @param objectToUpdate 업데이트하고 싶은 object
 * @param updatedValue 업데이트 될 값
 * @returns 전체적으로 업데이트 된 배열
 */
export function updateArrayWithObject<T>(array: T[], objectToUpdate: T, updatedValue: Partial<T>): T[] {
    const updatedArray = array.map((obj) => (obj === objectToUpdate ? { ...obj, ...updatedValue } : obj));
    return updatedArray;
}

export function removeDuplicates(arr: number[]): number[] {
    const uniqueArr = Array.from(new Set(arr));
    uniqueArr.sort((a, b) => a - b);
    return uniqueArr;
}
