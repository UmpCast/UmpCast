import { Text } from 'native-base'

export default function OrgMemberHeader({ children }: { children: string }) {
    return (
        <Text color="blueGray.600" fontWeight="medium">
            {children}
        </Text>
    )
}
