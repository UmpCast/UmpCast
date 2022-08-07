import { HStack, VStack, Text } from 'native-base'

import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import DividedList from '@/nx/components/DividedList'
import Subheader from '@/nx/components/Subheader'
import PressableX, { PressableXProps } from '@/nx/components/X/PressableX'
import PositionTitle from '@/nx/features/PositionTitle'

import MaterialIcon from '../../../components/MaterialIcon'

import { useScreenQuery } from './index.generated'

export type Props = RootStackScreenProps<RootStackRoute.SeasonStructureV2>

function SectionPressable(props: PressableXProps) {
    return (
        <PressableX
            colorScheme="secondary"
            rounded="sm"
            size="sm"
            variant="ghost"
            {...props}
        />
    )
}

export default function SeasonStructureScreenV2({ route }: Props) {
    const { params } = route
    const { seasonId } = params

    const [{ data }] = useScreenQuery({
        variables: {
            seasonId
        }
    })

    if (!data?.season) return null

    const { divisions } = data.season

    return (
        <ScreenContainer>
            <VStack space="md">
                {divisions.map((division) => {
                    const { positions } = division
                    return (
                        <VStack key={division.id} space="xs">
                            <SectionPressable>
                                <HStack
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Subheader>{division.name}</Subheader>
                                    <MaterialIcon
                                        color="primary.600"
                                        name="chevron-right"
                                        size="lg"
                                    />
                                </HStack>
                            </SectionPressable>
                            <DividedList.Container>
                                {positions.map((position) => (
                                    <DividedList.Item key={position.id}>
                                        <PositionTitle
                                            division={division}
                                            position={position}
                                        />
                                    </DividedList.Item>
                                ))}
                                <DividedList.Item>
                                    <HStack alignItems="center" space={2}>
                                        <MaterialIcon
                                            color="secondary.mute"
                                            name="plus"
                                        />
                                        <Text color="secondary.mute">
                                            Add Position
                                        </Text>
                                    </HStack>
                                </DividedList.Item>
                            </DividedList.Container>
                        </VStack>
                    )
                })}
                <SectionPressable>
                    <HStack alignItems="center" space={1}>
                        <MaterialIcon color="secondary.base" name="plus" />
                        <Text bold>Add Division</Text>
                    </HStack>
                </SectionPressable>
            </VStack>
        </ScreenContainer>
    )
}
