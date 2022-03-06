import { Badge, IBadgeProps } from 'native-base'

export interface SeasonPermissionBadgeProps extends IBadgeProps {}

export default function SeasonPermissionBadge(
    props: SeasonPermissionBadgeProps
) {
    return <Badge _text={{ fontSize: '2xs' }} colorScheme="indigo" {...props} />
}
