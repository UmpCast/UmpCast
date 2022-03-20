import { AntDesign } from '@expo/vector-icons'
import {
    Box,
    Checkbox,
    Divider,
    Heading,
    HStack,
    Icon,
    VStack,
    Text
} from 'native-base'

import ScreenContainer from '@/components/Screen/Container'

export default function SeasonRefereeAboutScreen() {
    return (
        <ScreenContainer>
            <VStack space={3}>
                <Text color="blueGray.400">VISIBILITY</Text>
                <Box
                    backgroundColor="blueGray.100"
                    borderRadius={5}
                    px={6}
                    py={4}
                >
                    <VStack space={2}>
                        <VStack space={4}>
                            <VStack space={2}>
                                <Text fontSize="md" fontWeight="bold">
                                    AAA
                                </Text>
                                <VStack ml={4} space={2}>
                                    <HStack justifyContent="space-between">
                                        <HStack alignItems="center" space={2}>
                                            <Icon
                                                as={AntDesign}
                                                name="user"
                                                size={4}
                                            />
                                            <Text fontSize="md">Base</Text>
                                        </HStack>
                                        <Checkbox isChecked value="" />
                                    </HStack>
                                    <HStack justifyContent="space-between">
                                        <Text fontSize="md" fontWeight="medium">
                                            Plate
                                        </Text>
                                        <Checkbox isChecked value="" />
                                    </HStack>
                                </VStack>
                                <Text fontSize="md" fontWeight="bold">
                                    PCL
                                </Text>
                                <VStack ml={4} space={2}>
                                    <HStack justifyContent="space-between">
                                        <Text fontSize="md" fontWeight="medium">
                                            Base
                                        </Text>
                                        <Checkbox isChecked value="" />
                                    </HStack>
                                    <HStack justifyContent="space-between">
                                        <Text fontSize="md" fontWeight="medium">
                                            Plate
                                        </Text>
                                        <Checkbox isChecked value="" />
                                    </HStack>
                                </VStack>
                            </VStack>
                        </VStack>
                    </VStack>
                </Box>
                <HStack justifyContent="space-between">
                    <HStack alignItems="center" space={2}>
                        <Text color="blueGray.400">LIMITS</Text>
                    </HStack>
                </HStack>
                <Box
                    backgroundColor="blueGray.100"
                    borderRadius={5}
                    px={6}
                    py={4}
                >
                    <VStack space={2}>
                        <VStack space={1}>
                            <HStack justifyContent="space-between">
                                <Heading fontSize="sm">Maximum Casts</Heading>
                                <Heading color="indigo.600" fontSize="sm">
                                    3
                                </Heading>
                            </HStack>
                            <Text color="blueGray.400" fontSize="sm" mr={3}>
                                Number of games you can assigned yourself to at
                                a time
                            </Text>
                        </VStack>
                        <Divider color="blueGray.400" />
                        <VStack space={1}>
                            <HStack justifyContent="space-between">
                                <Heading fontSize="sm">Maximum Backups</Heading>
                                <Heading color="indigo.600" fontSize="sm">
                                    3
                                </Heading>
                            </HStack>
                            <Text color="blueGray.400" fontSize="sm" mr={3}>
                                Number of games you can assigned yourself to at
                                a time
                            </Text>
                        </VStack>
                    </VStack>
                </Box>
            </VStack>
        </ScreenContainer>
    )
}
