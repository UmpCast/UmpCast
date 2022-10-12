import { Avatar } from 'native-base'
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar'

import { OrgLogoFragment } from './index.generated'

interface Props extends IAvatarProps {
    org: OrgLogoFragment
    circle?: boolean
}

export default function OrgLogo({ org, children, circle = false, ...rest }: Props) {
    const { logoUrl, name } = org
    const borderRadius = circle ? 'full' : 'sm'

    return (
        <Avatar
            source={logoUrl ? { uri: logoUrl } : undefined}
            {...rest}
            borderRadius={borderRadius}
            _image={{
                borderRadius
            }}
        >
            {name[0].toUpperCase()}
            {children}
        </Avatar>
    )
}
