import { extendTheme, theme } from 'native-base'

const { colors } = theme

const { lightBlue, blueGray, amber } = colors

const appTheme = extendTheme({
    colors: {
        primary: lightBlue,
        secondary: blueGray,
        danger: amber
    },
    components: {
        Text: {
            defaultProps: {
                color: 'secondary.700',
                fontSize: 'md',
                fontWeight: 450
            }
        },
        Icon: {
            defaultProps: {
                size: 'md'
            }
        }
    }
})

export type AppTheme = typeof appTheme

declare module 'native-base' {
    interface ICustomTheme extends AppTheme {}
}

export default appTheme
