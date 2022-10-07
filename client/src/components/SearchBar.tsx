import Form from './Form'
import MaterialIcon from './MaterialIcon'
import { IInputProps } from 'native-base'

export default function SearchBar(props: IInputProps) {
    return (
        <Form.UncontrolledInput
            InputLeftElement={
                <MaterialIcon color="secondary.mute" ml={4} name="magnify" size="lg" />
            }
            {...props}
        />
    )
}
