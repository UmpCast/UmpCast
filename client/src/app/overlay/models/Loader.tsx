export type LoaderIcon = 'static' | 'spinner'

export default interface Loader {
    icon?: LoaderIcon
    title?: string
    message?: string
}
