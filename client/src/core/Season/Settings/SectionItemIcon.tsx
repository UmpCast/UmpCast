import { Icon, IIconProps } from 'native-base'

export interface SeasonSettingsSectionItemIconProps extends IIconProps {}

export default function SeasonSettingsSectionItemIcon(
    props: SeasonSettingsSectionItemIconProps
) {
    return <Icon size={5} color="blueGray.600" {...props} />
}
