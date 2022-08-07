import { theme } from 'native-base'

const { lightBlue, blueGray, rose } = theme.colors

export const primary = {
    base: lightBlue[700],
    mute: lightBlue[400],
    focus: lightBlue[200],
    hover: lightBlue[100]
}

export const secondary = {
    base: blueGray[600]
}

export const danger = {
    base: rose[500]
}
