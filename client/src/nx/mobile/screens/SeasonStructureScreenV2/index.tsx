import ScreenContainer from '@/components/Screen/Container'
import { RootStackRoute } from '@/mobile/navigation/navigators/Root/Stack'
import { RootStackScreenProps } from '@/mobile/navigation/types'
import DividedList from '@/nx/components/DividedList'
import Subheader from '@/nx/components/Subheader'
import PositionTitle from '@/nx/features/PositionTitle'
import {
    HStack,
    VStack,
    Text,
    Box,
    Icon,
    Pressable,
    IPressableProps
} from 'native-base'
import { useScreenQuery } from './index.generated'
import { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MaterialIcon from '../../../components/MaterialIcon'

export type Props = RootStackScreenProps<RootStackRoute.SeasonStructureV2>

function SectionPressable(props: IPressableProps) {
    return (
        <Pressable
            size="xs"
            rounded="sm"
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

    useEffect(() => {
        setOptions({
            headerRight: () => (
                <Box mr={4}>
                    <HStack alignItems="center" space={1} />
                </Box>
            )
        })
    }, [setOptions])

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
                                        <DividedList.Pressable
                                            key={position.id}
                                        >
                                            <DividedList.Item>
                                                <PositionTitle
                                                    position={position}
                                                    division={division}
                                                />
                                            </DividedList.Item>
                                        </DividedList.Pressable>
                                    )
                                })}
                                <DividedList.Pressable>
                                    <DividedList.Item>
                                        <HStack alignItems="center" space={2}>
                                            <MaterialIcon
                                                name="plus"
                                                color="secondary.400"
                                            />
                                            <Text color="secondary.400">
                                                Add Position
                                            </Text>
                                        </HStack>
                                    </DividedList.Item>
                                </DividedList.Pressable>
                            </DividedList.Container>
                        </VStack>
                    )
                })}
                <SectionPressable>
                    <HStack alignItems="center" space={1}>
                        <Icon as={MaterialCommunityIcons} name="plus" />
                        <Text bold>Add Division</Text>
                    </HStack>
                </SectionPressable>
            </VStack>
        </ScreenContainer>
    )
}
