import { Box, IBoxProps } from 'native-base'

export interface SettingsCardProps extends IBoxProps {}

export default function SettingsCard(props: SettingsCardProps) {
    return <Box backgroundColor="blueGray.100" borderRadius={5} {...props} />
}
