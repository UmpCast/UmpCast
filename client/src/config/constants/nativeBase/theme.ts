import { extendTheme, theme } from 'native-base'

const { colors } = theme

const { lightBlue, blueGray, rose } = colors

const appTheme = extendTheme({
    colors: {
        primary: {
            base: lightBlue[700],
            ...lightBlue
        },
        secondary: {
            base: blueGray[700],
            mute: blueGray[400],
            focus: blueGray[200],
            hover: blueGray[100],
            ...blueGray
        },
        danger: {
            base: rose[400],
            ...rose
        }
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
