import AppCache from 'apollo/appCache'

export default function clearAuthentication(): boolean {
    return AppCache.evict({ id: 'Authentication:{}' })
}
