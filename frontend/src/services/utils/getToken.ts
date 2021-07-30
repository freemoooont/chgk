//TODO: Добавить на проверку сначала в стейте, а потом уже в локалстораж
export const getToken = (): string => {
    return window.localStorage.getItem('token') ?? 'ERROR_TOKEN'
};