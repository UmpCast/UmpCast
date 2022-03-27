import { IPressableProps, Pressable } from 'native-base'

export interface SeasonSettingsItemGroupPressableProps
    extends IPressableProps {}

export default function SeasonSettingsItemGroupPressable({
    children,
    ...rest
}: SeasonSettingsItemGroupPressableProps) {
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
