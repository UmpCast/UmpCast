import { Badge, IBadgeProps } from 'native-base'

export interface SeasonPermissionBadgeProps extends IBadgeProps {}

export default function SeasonPermissionBadge(
    props: SeasonPermissionBadgeProps
) {
    return (
        <Badge
            _text={{ fontSize: 9 }}
            py={0}
            px={1}
            colorScheme="indigo"
            {...props}
        />
    )
}
