import { extendTheme, theme } from 'native-base'

const { lightBlue, blueGray } = theme.colors

const appTheme = extendTheme({
    colors: {
        primary: lightBlue,
        secondary: blueGray
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
        },
        Pressable: {
            sizes: {
                lg: {
                    px: 6,
                    py: 3
                },
                md: {
                    px: 4,
                    py: 3
                },
                sm: {
                    px: 4,
                    py: 2
                },
                xs: {
                    px: 2,
                    py: 1
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
