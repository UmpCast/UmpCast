import { extendTheme, theme } from 'native-base'

const appTheme = extendTheme({
    fontConfig: {
        Roboto: {
            100: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic'
            },
            200: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic'
            },
            300: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic'
            },
            400: {
                normal: 'Roboto-Regular',
                italic: 'Roboto-Italic'
            },
            500: {
                normal: 'Roboto-Medium'
            },
            600: {
                normal: 'Roboto-Medium',
                italic: 'Roboto-MediumItalic'
            }
        }
    },
    colors: {
        primary: theme.colors.lightBlue,
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
                    borderColor: 'primary.500'
                },
                placeholderTextColor: 'blueGray.400',
                borderColor: 'secondary.200',
                color: 'secondary.600',
                fontWeight: 'medium'
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
                color: 'secondary.400'
            }
        },
        Text: {
            defaultProps: {
                color: 'secondary.600',
                fontWeight: 'medium'
            }
        },
        Heading: {
            defaultProps: {
                color: 'blueGray.700'
            }
        },
        Checkbox: {
            defaultProps: {
                colorScheme: 'primary'
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
