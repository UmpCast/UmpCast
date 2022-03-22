import { Box, IBoxProps } from 'native-base'

export interface SeasonSettingsCardProps extends IBoxProps {}

export default function SeasonSettingsCard(props: SeasonSettingsCardProps) {
    return <Box backgroundColor="blueGray.100" borderRadius={5} {...props} />
}
