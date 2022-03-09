import ScreenContainer from '@/components/Screen/Container'
import { AntDesign, Feather } from '@expo/vector-icons'
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

export default function SeasonRefereeInfoScreen() {
    return (
        <ScreenContainer>
            <VStack space={3}>
                <Text color="blueGray.400">VISIBILITY</Text>
                <Box
                    backgroundColor="blueGray.100"
                    px={6}
                    py={4}
                    borderRadius={5}
                >
                    <VStack space={2}>
                        <VStack space={4}>
                            <VStack space={2}>
                                <Text fontWeight="bold" fontSize="md">
                                    AAA
                                </Text>
                                <VStack ml={4} space={2}>
                                    <HStack justifyContent="space-between">
                                        <HStack space={2} alignItems="center">
                                            <Icon
                                                as={AntDesign}
                                                name="user"
                                                size={4}
                                            />
                                            <Text fontSize="md">Base</Text>
                                        </HStack>
                                        <Checkbox value="" isChecked={true} />
                                    </HStack>
                                    <HStack justifyContent="space-between">
                                        <Text fontWeight="medium" fontSize="md">
                                            Plate
                                        </Text>
                                        <Checkbox value="" isChecked={true} />
                                    </HStack>
                                </VStack>
                                <Text fontWeight="bold" fontSize="md">
                                    PCL
                                </Text>
                                <VStack ml={4} space={2}>
                                    <HStack justifyContent="space-between">
                                        <Text fontWeight="medium" fontSize="md">
                                            Base
                                        </Text>
                                        <Checkbox value="" isChecked={true} />
                                    </HStack>
                                    <HStack justifyContent="space-between">
                                        <Text fontWeight="medium" fontSize="md">
                                            Plate
                                        </Text>
                                        <Checkbox value="" isChecked={true} />
                                    </HStack>
                                </VStack>
                            </VStack>
                        </VStack>
                    </VStack>
                </Box>
                <HStack justifyContent="space-between">
                    <HStack space={2} alignItems="center">
                        <Text color="blueGray.400">LIMITS</Text>
                    </HStack>
                </HStack>
                <Box
                    backgroundColor="blueGray.100"
                    px={6}
                    py={4}
                    borderRadius={5}
                >
                    <VStack space={2}>
                        <VStack space={1}>
                            <HStack justifyContent="space-between">
                                <Heading fontSize="sm">Maximum Casts</Heading>
                                <Heading fontSize="sm" color="indigo.600">
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
                                <Heading fontSize="sm" color="indigo.600">
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
