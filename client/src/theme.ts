import { extendTheme } from 'native-base'

const appTheme = extendTheme({
    components: {
        Input: {
            baseStyle: {
                _focus: {
                    borderColor: 'indigo.500'
                }
            }
        }
    }
})

export type AppTheme = typeof appTheme

declare module 'native-base' {
    interface ICustomTheme extends AppTheme {}
}

export default appTheme
