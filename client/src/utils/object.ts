export const joinArrays = (arr1: any[], arr2: any[], spread: boolean = false) =>
    arr1.flatMap((e1) =>
        arr2.map((e2) => (spread ? { ...e1, ...e2 } : [e1, e2]))
    )
