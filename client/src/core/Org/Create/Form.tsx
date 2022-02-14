import HFErrorMessage from '@/lib/HF/ErrorMessage'
import HFInput from '@/lib/HF/Input'
import HFFormControl from '@/lib/HF/FormControl'
import { FormControl, VStack } from 'native-base'
import { Control, Controller } from 'react-hook-form'
import { OrgCreateInput } from './useForm'
import HFTextArea from '@/lib/HF/TextArea'

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
                        <HFInput {...props} size="md" />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
            <Controller
                name="description"
                control={control}
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label>Description</FormControl.Label>
                        <HFTextArea {...props} totalLines={2} />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
        </VStack>
    )
}
