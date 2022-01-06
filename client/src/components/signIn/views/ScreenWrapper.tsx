import { Center } from 'native-base'

import { WrapperProps } from '@/utils/types'

export interface ScreenWrapperProps extends WrapperProps {}

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
    return (
        <Center flex={1} flexDirection="row" px={6}>
            {children}
        </Center>
    )
}