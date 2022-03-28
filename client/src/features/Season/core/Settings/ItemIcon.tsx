import { Icon, IIconProps } from 'native-base'

export interface SeasonSettingsItemIconProps extends IIconProps {}

export default function SeasonSettingsItemIcon(
    props: SeasonSettingsItemIconProps
) {
    return <Icon color="blueGray.600" size={5} {...props} />
}
