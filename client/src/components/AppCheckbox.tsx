import { Checkbox, ICheckboxProps } from 'native-base'

export default function AppCheckbox(
    props: Pick<ICheckboxProps, 'onChange' | 'isChecked' | 'isDisabled'>
) {
    return <Checkbox accessibilityLabel="checkbox" value="" {...props} />
}
