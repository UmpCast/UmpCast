import HFErrorMessage from '@/lib/HF/ErrorMessage'
import HFInput from '@/lib/HF/Input'
import HFFormControl from '@/lib/HF/FormControl'
import { FormControl, InputGroup, InputLeftAddon, VStack } from 'native-base'
import { Control, Controller } from 'react-hook-form'
import { OrgCreateInput } from './useForm'

export interface OrgCreateFormProps {
    control: Control<OrgCreateInput>
}

export default function OrgCreateForm({ control }: OrgCreateFormProps) {
    return (
        <VStack space={4}>
            <Controller
                name="title"
                control={control}
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label isRequired>Title</FormControl.Label>
                        <HFInput {...props} />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
            <Controller
                name="email"
                control={control}
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label>Email</FormControl.Label>
                        <HFInput {...props} />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
            <Controller
                name="websiteUrl"
                control={control}
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label>Website</FormControl.Label>
                        <InputGroup>
                            <InputLeftAddon children="https://" />
                            <HFInput {...props} flex={1} />
                        </InputGroup>
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
        </VStack>
    )
}
