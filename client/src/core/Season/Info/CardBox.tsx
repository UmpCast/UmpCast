import { Box, IBoxProps } from 'native-base'

export interface SeasonInfoCardBoxProps extends IBoxProps {}

export default function SeasonInfoCardBox(props: SeasonInfoCardBoxProps) {
    return <Box backgroundColor="blueGray.400" {...props} />
}
