import { FormControl, IFormControlLabelProps } from 'native-base'

function Label(props: IFormControlLabelProps) {
    return <FormControl.Label {...props} />
}

export default Label
