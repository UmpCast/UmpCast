import { ColorMode } from '@/hooks/useColorMode'
import { extendTheme, theme } from 'native-base'

const { colors } = theme

const { lightBlue, blueGray,coolGray, white, black, amber } = colors

export const getAppTheme = (mode: ColorMode)  => {
    const colors = mode === "light" ? {
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
            lite: blueGray[100],
            bg: white
        },
        danger: {
            ...amber,
            solid: amber[400]
        }
    } : {
        primary: {
            ...lightBlue,
            deep: lightBlue[500],
            solid: lightBlue[400],
            subtle: lightBlue[200],
            lite: lightBlue[100]
        },
        secondary: {
            ...coolGray,
            solid: coolGray[100],
            mute: coolGray[500],
            subtle: coolGray[900],
            lite: "#0d1017",
            bg: black
        },
        danger: {
            ...amber,
            solid: amber[400]
        }
    }

    return extendTheme({
        colors,
        components: {
            Text: {
                defaultProps: {
                    color: 'secondary.solid',
                    fontSize: 'md',
                    fontWeight: 500
                }
            },
            Heading: {
                defaultProps: {
                    color: 'secondary.solid'
                }
            },
            Icon: {
                defaultProps: {
                    size: 'md',
                    color: 'secondary.solid'
                }
            },
            ActionSheetContent: {
                defaultProps: {
                    backgroundColor: 'secondary.lite'
                }
            }
        }
    })
}

type CustomThemeType = ReturnType<typeof getAppTheme>;

declare module 'native-base' {
    interface ICustomTheme extends CustomThemeType {}
  }