import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Box, HStack, Text, VStack } from 'native-base'
import { Pressable } from 'react-native'

export default function HomeBottomTabBar({
    state,
    descriptors,
    navigation
}: BottomTabBarProps) {
    return (
        <Box borderTopWidth={1} borderColor="blueGray.200" p={1} pt={2.5}>
            <HStack justifyContent="space-evenly">
                {state.routes.map((route, index) => {
                    const { navigate } = navigation
                    const {
                        options: { tabBarLabel, tabBarIcon }
                    } = descriptors[route.key]

                    const focused = state.index === index

                    const color = focused ? 'indigo.600' : 'blueGray.400'

                    return (
                        <Box key={route.key}>
                            <Pressable
                                onPress={() => {
                                    navigate({
                                        name: route.name,
                                        merge: true,
                                        params: undefined
                                    })
                                }}
                            >
                                <VStack alignItems="center">
                                    {tabBarIcon &&
                                        tabBarIcon({
                                            focused,
                                            color,
                                            size: 5
                                        })}
                                    <Text color={color}>{tabBarLabel}</Text>
                                </VStack>
                            </Pressable>
                        </Box>
                    )
                })}
            </HStack>
        </Box>
    )
}
