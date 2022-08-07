import { extendTheme, theme } from 'native-base'

const { colors } = theme

const { lightBlue, blueGray, amber } = colors

const appTheme = extendTheme({
    colors: {
        primary: {
            base: lightBlue[600],
            mute: lightBlue[400],
            focus: lightBlue[100],
            hover: lightBlue[100],
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
            base: amber[400],
            mute: amber[300],
            focus: amber[200],
            hover: amber[100],
            ...amber
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
