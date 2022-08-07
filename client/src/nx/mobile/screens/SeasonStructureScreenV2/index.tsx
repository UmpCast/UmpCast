import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import DividedList from '@/nx/components/DividedList'
import Subheader from '@/nx/components/Subheader'
import PositionTitle from '@/nx/features/PositionTitle'
import { HStack, VStack, Text } from 'native-base'
import { useScreenQuery } from './index.generated'
import MaterialIcon from '../../../components/MaterialIcon'
import PressableX from '@/nx/components/X/PressableX'
import { PressableXProps } from '../../../components/X/PressableX'

export type Props = RootStackScreenProps<RootStackRoute.SeasonStructureV2>

function SectionPressable(props: PressableXProps) {
    return (
        <PressableX
            size="md"
            _pressed={{ backgroundColor: 'secondary.200' }}
            {...props}
        />
    )
}

export default function SeasonStructureScreenV2({ route, navigation }: Props) {
    const { params } = route
    const { setOptions } = navigation
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
                        <VStack space="xs" key={division.id}>
                            <SectionPressable>
                                <HStack
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Subheader>{division.name}</Subheader>
                                    <MaterialIcon
                                        color="primary.600"
                                        size="lg"
                                        name="chevron-right"
                                    />
                                </HStack>
                            </SectionPressable>
                            <DividedList.Container>
                                {positions.map((position) => {
                                    return (
                                        <DividedList.Item key={position.id}>
                                            <PositionTitle
                                                position={position}
                                                division={division}
                                            />
                                        </DividedList.Item>
                                    )
                                })}
                                <DividedList.Item>
                                    <HStack alignItems="center" space={2}>
                                        <MaterialIcon
                                            name="plus"
                                            color="secondary.mute"
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
                        <MaterialIcon name="plus" color="secondary.base" />
                        <Text bold>Add Division</Text>
                    </HStack>
                </SectionPressable>
            </VStack>
        </ScreenContainer>
    )
}
