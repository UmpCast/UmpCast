import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, Button } from 'native-base'

import useSeasonViewerOrgRole from '@/features/Season/hooks/useOrgRole'
import { OrganizationRoleType } from '@/generated'
import { RootStackRoute } from '@/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/navigation/types'

type ScreenProps = RootStackScreenProps<RootStackRoute.SeasonParticipants>

export default function SeasonParticipantsScreenHeaderRight() {
    const {
        params: { seasonId }
    } = useRoute<ScreenProps['route']>()
    const { navigate } = useNavigation<ScreenProps['navigation']>()

    const role = useSeasonViewerOrgRole({
        seasonId
    })

    return (
        <Box mr={2}>
            {role === OrganizationRoleType.Owner ? (
                <Button
                    colorScheme="indigo"
                    onPress={() => {
                        navigate(RootStackRoute.SeasonParticipantsAdd, {
                            seasonId
                        })
                    }}
                    variant="ghost"
                >
                    Add
                </Button>
            ) : null}
        </Box>
    )
}
