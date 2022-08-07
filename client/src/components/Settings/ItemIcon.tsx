import { Icon, IIconProps } from 'native-base'

export interface SettingsItemIconProps extends IIconProps {}

export default function SettingsItemIcon(props: SettingsItemIconProps) {
    return <Icon button={5} color="blueGray.600" {...props} />
}
