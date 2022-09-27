import FormControl from './ControlDep'
import Control from './Control'
import DateInput from './DateInput'
import FormErrorMessage from './ErrorMessage'
import Group from './Group'
import Input from './Input'
import FormLabel from './Label'
import Stack from './Stack'
import Provider from './Provider'

export default {
    ControlDep: FormControl,
    Label: FormLabel,
    Control,
    Input,
    Stack,
    Group,
    Container: Provider,
    DateInput,
    ErrorMessage: FormErrorMessage
}
