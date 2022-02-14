import HFErrorMessage from '@/lib/HF/ErrorMessage'
import HFInput from '@/lib/HF/Input'
import HFFormControl from '@/lib/HF/FormControl'
import { FormControl, VStack } from 'native-base'
import { Control, Controller } from 'react-hook-form'
import OrgProfilePictureInput from '../Profile/PictureInput'
import { OrgCreateInput } from './useForm'

export interface OrgProfileFormProps {
    control: Control<OrgCreateInput>
    profilePictureUrl: string
}

export default function OrgProfileForm({
    control,
    profilePictureUrl
}: OrgProfileFormProps) {
    return (
        <VStack space={4}>
            <Controller
                name="profilePictureB64"
                control={control}
                render={(props) => {
                    return (
                        <OrgProfilePictureInput
                            {...props}
                            url={profilePictureUrl}
                        />
                    )
                }}
            />
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
        </VStack>
    )
}
