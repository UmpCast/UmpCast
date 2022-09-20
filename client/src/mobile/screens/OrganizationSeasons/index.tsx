import { AntDesign } from '@expo/vector-icons'
import { VStack, Box, Heading, HStack, Button, Icon } from 'native-base'

import OrgSeasonListItem from '@/features/OrgSeason/core/List/Item'
import { useOrganizationSeasonsScreenQuery } from '@/graphql/generated'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'

type ScreenProps = RootStackScreenProps<RootStackRoute.OrganizationSeasons>

export default function OrganizationSeasonsScreen({ navigation, route }: ScreenProps) {
    const { navigate } = navigation
    const {
        params: { orgId }
    } = route
    const [{ data }] = useOrganizationSeasonsScreenQuery({
        variables: {
            id: orgId
        }
    })

    if (!data?.organization?.seasons) return null

    const { seasons } = data.organization

    return (
        <Box p={4}>
            <VStack space={4}>
                <HStack alignItems="center" justifyContent="space-between">
                    <Heading size="sm">Active</Heading>
                    <Button
                        borderRadius={100}
                        button="sm"
                        colorScheme="blueGray"
                        onPress={() => {
                            navigate(RootStackRoute.OrganizationSeasonNew, {
                                orgId
                            })
                        }}
                        variant="ghost"
                    >
                        <Icon as={AntDesign} color="indigo.500" name="plus" />
                    </Button>
                </HStack>
                <VStack space={4}>
                    {seasons.map(
                        (season) =>
                            season && (
                                <OrgSeasonListItem
                                    key={season.id}
                                    onPress={() => {
                                        navigate(RootStackRoute.SeasonSettings, {
                                            seasonId: season.id
                                        })
                                    }}
                                    season={season}
                                />
                            )
                    )}
                </VStack>
            </VStack>
        </Box>
    )
}
