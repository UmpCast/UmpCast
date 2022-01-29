import { StackScreenProps } from '@react-navigation/stack'
import { Box } from 'native-base'

import { RootStackParamList, RootStackRoutes } from '@/navigation'

import SeasonStructureEditor from './Editor'

type ScreenProps = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.SeasonStructure
>

export default function SeasonStructureScreen({ route }: ScreenProps) {
    const { params } = route
    return (
        <Box p={4}>
            <SeasonStructureEditor seasonId={params.seasonId} />
        </Box>
    )
}
