import { Button, Text, IButtonProps, HStack, Box } from 'native-base'

export interface UserJoinedOrgListItemButtonProps extends IButtonProps {
    source: React.ReactNode
    name: string
}

export function UserJoinedOrgListItemButton({
    source,
    name,
    ...rest
}: UserJoinedOrgListItemButtonProps) {
    return (
        <Button
            {...rest}
            colorScheme="blueGray"
            justifyContent="flex-start"
            variant="outline"
        >
            <HStack alignItems="center" space={3}>
                <Box
                    alignItems="center"
                    h="25px"
                    justifyContent="center"
                    w="25px"
                >
                    {source}
                </Box>
                <Text color="blueGray.600" fontSize="xs" fontWeight="medium">
                    {name}
                </Text>
            </HStack>
        </Button>
    )
}
