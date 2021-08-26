export type LoaderIcon = 'static' | 'spinner'

export default interface LoaderOptions {
    icon?: LoaderIcon
    title?: string
    message?: string
}
