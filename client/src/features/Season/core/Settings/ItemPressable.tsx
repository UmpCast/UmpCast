import { IPressableProps, Pressable } from 'native-base'

export interface SeasonSettingsItemPressableProps extends IPressableProps {}

export default function SeasonSettingsItemPressable({
    children,
    ...rest
}: SeasonSettingsItemPressableProps) {
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
