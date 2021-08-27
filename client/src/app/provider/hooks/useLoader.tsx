import { loaderVar } from 'global/reactiveVars'

import { defaultLoaderStyles, LoaderStyles } from '../models/Loader'

export type ProcessFn = (setMessage: (s: string) => void) => Promise<any>

export function setMessage(newMessage: string): void {
    const { styles, ...rest } = loaderVar()
    loaderVar({
        ...rest,
        styles: {
            ...styles,
            message: newMessage
        }
    })
}

export default function useLoader(
    initialStyles: LoaderStyles = defaultLoaderStyles
): (process: ProcessFn) => Promise<any> {
    return async (process: ProcessFn) => {
        loaderVar({
            subscribed: true,
            styles: initialStyles
        })

        const response = await process(setMessage)

        loaderVar({
            ...loaderVar(),
            subscribed: false
        })

        return response
    }
}
