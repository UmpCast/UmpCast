import { Icon, IIconProps } from 'native-base'

export interface SettingsItemIconProps extends IIconProps {}

export default function SettingsItemIcon(props: SettingsItemIconProps) {
    return <Icon color="blueGray.600" button={5} {...props} />
}
