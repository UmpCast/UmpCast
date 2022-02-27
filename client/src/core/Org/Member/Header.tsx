import { Text } from 'native-base'

export default function OrgMemberHeader({ children }: { children: string }) {
    return (
        <Text fontWeight="medium" color="blueGray.600">
            {children}
        </Text>
    )
}
