import { IPressableProps, Pressable } from 'native-base'

export interface SettingsItemPressableProps extends IPressableProps {}

export default function SettingsItemPressable({
    children,
    ...rest
}: SettingsItemPressableProps) {
    return (
        <Pressable
            _hover={{ backgroundColor: 'blueGray.200' }}
            _pressed={{ backgroundColor: 'blueGray.300' }}
            {...rest}
        >
            {children}
        </Pressable>
    )
}
