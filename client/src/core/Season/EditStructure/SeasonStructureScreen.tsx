import { RootStackParamList, RootStackRoutes } from '@/core/App/Root/Stack'
import { StackScreenProps } from '@react-navigation/stack'
import { Box } from 'native-base'

import SeasonStructureEditor from './SeasonStructureEditor'

type ScreenProps = StackScreenProps<
    RootStackParamList,
    RootStackRoutes.SeasonStructure
>

export default function SeasonStructureScreen({ route }: ScreenProps) {
    const { params } = route
    return (
        <Box p={4}>
            <SeasonStructureEditor seasonId={params.id} />
        </Box>
    )
}
