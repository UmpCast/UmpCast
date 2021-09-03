import cache from 'apollo/cache'

export default function clearAuthorization(): boolean {
    return cache.evict({ id: 'Authorization:{}' })
}
