import { useAppTheme } from '@/hooks/useAppTheme'
import { Input, IInputProps } from 'native-base'

export default function UncontrolledInput(props: IInputProps) {
    const {colorMode} = useAppTheme()
    return (
        <Input
            keyboardAppearance={colorMode}
            variant="unstyled"
            _focus={{
                borderColor: 'primary.solid'
            }}
            borderWidth={1}
            _invalid={{
                borderColor: 'danger.solid',
                _focus: {
                    borderColor: 'danger.solid'
                }
            }}
            borderColor="secondary.lite"
            color="secondary.solid"
            placeholderTextColor="secondary.mute"
            
            p={2.5}
            rounded="sm"
            backgroundColor="secondary.lite"
            size="lg"
            fontWeight={500}
            {...props}
        />
    )
}
