import { extendTheme, theme } from 'native-base'

const appTheme = extendTheme({
    colors: {
        primary: theme.colors.indigo,
        secondary: theme.colors.blueGray,
        danger: {
            '1': '#fda4af',
            '2': '#f43f5e',
            '3': '#9f1239'
        }
    },
    components: {
        Input: {
            defaultProps: {
                _focus: {
                    borderColor: 'indigo.500'
                },
                placeholderTextColor: 'blueGray.400',
                borderColor: 'blueGray.200',
                color: 'blueGray.600'
            }
        },
        InputLeftAddon: {
            defaultProps: {
                borderColor: 'blueGray.200',
                borderWidth: 2
            }
        },
        Icon: {
            defaultProps: {
                size: 5,
                color: 'blueGray.600'
            }
        },
        Text: {
            defaultProps: {
                color: 'blueGray.600'
            }
        },
        Heading: {
            defaultProps: {
                color: 'blueGray.700'
            }
        },
        Checkbox: {
            defaultProps: {
                colorScheme: 'indigo'
            }
        },
        Switch: {
            defaultProps: {
                colorScheme: 'indigo'
            }
        }
    }
})

export type AppTheme = typeof appTheme

declare module 'native-base' {
    interface ICustomTheme extends AppTheme {}
}

export default appTheme
