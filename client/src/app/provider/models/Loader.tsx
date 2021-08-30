export type LoaderIcon = 'static' | 'spinner'

export interface LoaderStyles {
    icon: LoaderIcon
    title: string | null
    message: string | null
}

export const defaultLoaderStyles: LoaderStyles = {
    icon: 'static',
    title: null,
    message: null
}

export default interface Loader {
    subscribed: boolean
    styles: Partial<LoaderStyles>
}

export const initialLoader: Loader = {
    subscribed: false,
    styles: defaultLoaderStyles
}
