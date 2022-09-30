import { IStackProps, VStack } from 'native-base'

export default function Stack(props: IStackProps) {
    return <VStack space={2} {...props} />
}
