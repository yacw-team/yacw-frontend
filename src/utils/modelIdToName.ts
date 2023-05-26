export const modelIdToName = (id: string) => {
    switch (id) {
        case '0':
        return 'GPT-3.5'
        case '1':
        return 'GPT-4'
        default:
        return 'Unknown'
    }
}