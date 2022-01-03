import { WrapperProps } from '@/utils/types'
import { Center } from 'native-base'

export interface SignInWrapperProps extends WrapperProps {}

export default function SignInWrapper({ children }: SignInWrapperProps) {
    return (
        <Center flex={1} flexDirection="row" px={6}>
            {children}
        </Center>
    )
}
