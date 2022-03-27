import { Icon, IIconProps } from 'native-base'

export interface SeasonSettingsItemIconProps extends IIconProps {}

export default function SeasonSettingsItemIcon(
    props: SeasonSettingsItemIconProps
) {
    return <Icon size={5} color="blueGray.600" {...props} />
}
