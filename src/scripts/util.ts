export function formUrl(baseUrl: string, params: { [ key: string ]: string }): string {
    const url = new URL(baseUrl)
    
    for (let param in params) {
        url.searchParams.append(param, params[param])
    }

    return url.toString()
}