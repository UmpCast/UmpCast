import { Checkbox, ICheckboxProps } from 'native-base'

export default function CheckBoxX(
    props: Pick<ICheckboxProps, 'onChange' | 'isChecked' | 'isDisabled'>
) {
    return <Checkbox accessibilityLabel="checkbox" value="" {...props} />
}
