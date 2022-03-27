import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, Button } from 'native-base'

import useSeasonViewerOrgRole from '@/features/Season/hooks/useOrgRole'
import { OrganizationRoleType } from '@/generated'
import { AppRootStackRoute } from '@/navigation/navigators/Root/Stack'
import { AppRootStackScreenProps } from '@/navigation/screenProps'

type ScreenProps = AppRootStackScreenProps<AppRootStackRoute.SeasonParticipants>

export default function SeasonParticipantListHeaderRight() {
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
                        navigate(AppRootStackRoute.SeasonParticipantsAdd, {
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
