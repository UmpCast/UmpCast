import { FormControl, VStack } from 'native-base'
import { Control, Controller } from 'react-hook-form'

import HFErrorMessage from '@/components/HF/ErrorMessage'
import HFFormControl from '@/components/HF/FormControl'
import HFInput from '@/components/HF/Input'
import HFTextArea from '@/components/HF/TextArea'

import { OrgCreateInput } from './useForm'

export interface OrgCreateFormProps {
    control: Control<OrgCreateInput>
}

export default function OrgCreateForm({ control }: OrgCreateFormProps) {
    return (
        <VStack space={4}>
            <Controller
                control={control}
                name="title"
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label isRequired>Title</FormControl.Label>
                        <HFInput {...props} size="md" />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
            <Controller
                control={control}
                name="description"
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
