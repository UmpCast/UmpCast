import { Avatar } from "native-base";
import { SizeType } from "native-base/lib/typescript/components/types";
import { OrgLogoFragment } from "./index.generated";
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar';

interface Props extends IAvatarProps{
    org: OrgLogoFragment
}

export default function OrgLogo({org, ...rest}: Props) {
    const {logoUrl, name} = org
 
    return <Avatar source={logoUrl ? { uri: logoUrl } : undefined} {...rest}>{name[0].toUpperCase()}</Avatar>
}