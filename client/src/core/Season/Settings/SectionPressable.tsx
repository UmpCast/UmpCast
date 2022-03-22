import { IPressableProps, Pressable } from 'native-base'

export interface SeasonSettingsSectionPressableProps extends IPressableProps {}

export default function SeasonSettingsSectionPressable({
    children,
    ...rest
}: SeasonSettingsSectionPressableProps) {
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
