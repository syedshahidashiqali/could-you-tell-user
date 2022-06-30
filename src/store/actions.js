export const actions = {
    SET_AUTH_USER: 'SET_USER',
    SET_AUTH_STATUS: 'SET_AUTH_STATUS'
} 

export function setAuthUser(user)
{
    return {
        type: actions.SET_AUTH_USER,
        payload: user
    }
}

export function setAuthStatus(status)
{
    return {
        type: actions.SET_AUTH_STATUS,
        payload: status
    }
}