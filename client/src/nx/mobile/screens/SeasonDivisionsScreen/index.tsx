import { HStack, VStack, Text } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import DividedList from '@/nx/components/DividedList'
import PressableX, { PressableXProps } from '@/nx/components/PressableX'
import Subheader from '@/nx/components/Subheader'
import PositionTitle from '@/nx/features/PositionTitle'

import MaterialIcon from '../../../components/MaterialIcon'

import { useScreenQuery } from './index.generated'

export type Props = RootStackScreenProps<RootStackRoute.SeasonDivisionsScreen>

function SectionPressable(props: PressableXProps) {
    return <PressableX rounded="sm" size="sm" variant="secondary.ghost" {...props} />
}

export default function SeasonDivisionsScreen({ route, navigation }: Props) {
    const { params } = route
    const { navigate } = navigation
    const { seasonId } = params

    const [{ data }] = useScreenQuery({
        variables: {
            seasonId
        }
    })

    if (!data?.season) return null

    const { divisions } = data.season

    const onPositionPress = (positionId: string) => {
        navigate(RootStackRoute.Position, {
            positionId
        })
    }

    const onDivisionPress = (divisionId: string) => {
        navigate(RootStackRoute.Division, {
            divisionId
        })
    }

    const onAddPositionPress = (divisionId: string) => {
        navigate(RootStackRoute.AddPosition, {
            divisionId
        })
    }

    const onAddDivisionPress = (seasonId: string) => {
        navigate(RootStackRoute.AddDivision, {
            seasonId
        })
    }

    return (
        <ScreenContainer>
            <VStack space="md">
                {divisions.map((division) => {
                    const { positions } = division
                    return (
                        <VStack key={division.id} space="xs">
                            <SectionPressable onPress={() => onDivisionPress(division.id)}>
                                <HStack alignItems="center" justifyContent="space-between">
                                    <Subheader>{division.name}</Subheader>
                                    <MaterialIcon
                                        color="primary.solid"
                                        name="chevron-right"
                                        size="lg"
                                    />
                                </HStack>
                            </SectionPressable>
                            <DividedList.Container>
                                {positions.map((position) => (
                                    <DividedList.Item
                                        key={position.id}
                                        onPress={() => onPositionPress(position.id)}
                                    >
                                        <PositionTitle division={division} position={position} />
                                    </DividedList.Item>
                                ))}
                                <DividedList.Item onPress={() => onAddPositionPress(division.id)}>
                                    <HStack alignItems="center" space={2}>
                                        <MaterialIcon color="secondary.mute" name="plus" />
                                        <Text color="secondary.mute">Add Position</Text>
                                    </HStack>
                                </DividedList.Item>
                            </DividedList.Container>
                        </VStack>
                    )
                })}
                <SectionPressable onPress={() => onAddDivisionPress(seasonId)}>
                    <HStack alignItems="center" space={1}>
                        <MaterialIcon color="secondary.solid" name="plus" />
                        <Text bold>Add Division</Text>
                    </HStack>
                </SectionPressable>
            </VStack>
        </ScreenContainer>
    )
}
