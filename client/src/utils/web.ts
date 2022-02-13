export const addURLParams = (url: URL, params: Record<string, string>) => {
    Object.entries(params).forEach(([k, v]) => {
        url.searchParams.set(k, v)
    })
}

export const getURLParams = (url: URL) => {
    const params: Record<string, string> = {}
    url.searchParams.forEach((v, k) => {
        params[k] = v
    })
    return params
}

export const URLRegex =
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
