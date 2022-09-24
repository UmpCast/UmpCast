import { Avatar } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'

import { OrgLogoFragment } from './index.generated'

interface Props extends IAvatarProps {
    org: OrgLogoFragment
}

export default function OrgLogo({ org, ...rest }: Props) {
    const { logoUrl, name } = org

    return (
        <Avatar source={logoUrl ? { uri: logoUrl } : undefined} {...rest}>
            {name[0].toUpperCase()}
        </Avatar>
    )
}
