import { Badge, IBadgeProps } from 'native-base'

export interface SeasonRoleBadgeProps extends IBadgeProps {}

export default function SeasonRoleBadge(props: SeasonRoleBadgeProps) {
    return (
        <Badge
            _text={{ fontSize: 9 }}
            colorScheme="indigo"
            px={1}
            py={0}
            {...props}
        />
    )
}
