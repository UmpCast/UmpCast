import { extendTheme, theme } from 'native-base'

const { colors } = theme

const { lightBlue, blueGray, amber } = colors

const appTheme = extendTheme({
    colors: {
        primary: {
            ...lightBlue,
            deep: lightBlue[700],
            solid: lightBlue[600],
            subtle: lightBlue[200],
            lite: lightBlue[100]
        },
        secondary: {
            ...blueGray,
            solid: blueGray[700],
            mute: blueGray[400],
            subtle: blueGray[200],
            lite: blueGray[100]
        },
        danger: {
            ...amber,
            solid: amber[400]
        }
    },
    components: {
        Text: {
            defaultProps: {
                color: 'secondary.solid',
                fontSize: 'md',
                fontWeight: 500
            }
        },
        Icon: {
            defaultProps: {
                size: 'md',
                color: 'secondary.solid'
            }
        }
    }
})

export type AppTheme = typeof appTheme

declare module 'native-base' {
    interface ICustomTheme extends AppTheme {}
}

export default appTheme
