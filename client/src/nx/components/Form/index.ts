import Control from './Control'
import FormControl from './ControlDep'
import DateInput from './DateInput'
import FormErrorMessage from './ErrorMessage'
import Group from './Group'
import Input from './Input'
import FormLabel from './Label'
import Provider from './Provider'
import Stack from './Stack'
import ControlX from './ControlX'

export default {
    ControlDep: FormControl,
    Label: FormLabel,
    Control,
    ControlX,
    Input,
    Stack,
    Group,
    Container: Provider,
    DateInput,
    ErrorMessage: FormErrorMessage
}
