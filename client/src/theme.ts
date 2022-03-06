import { extendTheme } from 'native-base'

const appTheme = extendTheme({
    colors: {
        primary: {
            '1': '#a5b4fc',
            '2': '#6366f1',
            '3': '#3730a3'
        },
        secondary: {
            '1': '#cbd5e1',
            '2': '#64748b',
            '3': '#1e293b'
        },
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
                borderColor: 'blueGray.200',
                borderWidth: 2
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
                size: 5
            }
        },
        Text: {
            defaultProps: {
                color: 'blueGray.700'
            }
        }
    }
})

export type AppTheme = typeof appTheme

declare module 'native-base' {
    interface ICustomTheme extends AppTheme {}
}

export default appTheme
