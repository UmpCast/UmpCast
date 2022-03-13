import { StackScreenProps } from '@react-navigation/stack'
import { Box } from 'native-base'
import { RootStackParamList, RootStackRoutes } from './AppRootStack'
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
