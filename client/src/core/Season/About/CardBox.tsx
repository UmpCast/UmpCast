import { Box, IBoxProps } from 'native-base'

export interface SeasonAboutCardBoxProps extends IBoxProps {}

export default function SeasonAboutCardBox(props: SeasonAboutCardBoxProps) {
    return <Box backgroundColor="blueGray.400" {...props} />
}
