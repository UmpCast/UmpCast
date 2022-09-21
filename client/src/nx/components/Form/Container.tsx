import { VStack } from 'native-base'

interface Props {
    children: JSX.Element | JSX.Element[]
}

export default function Container({ children }: Props) {
    return <VStack space={2}>{children}</VStack>
}
