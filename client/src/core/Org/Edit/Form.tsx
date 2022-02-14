import HFErrorMessage from '@/lib/HF/ErrorMessage'
import HFInput from '@/lib/HF/Input'
import HFFormControl from '@/lib/HF/FormControl'
import { FormControl, InputGroup, InputLeftAddon, VStack } from 'native-base'
import { Control, Controller } from 'react-hook-form'
import OrgProfilePictureInput from '../Profile/PictureInput'
import { OrgEditInput } from './useForm'

export interface OrgEditFormProps {
    control: Control<OrgEditInput>
    profilePictureUrl: string
}

export default function OrgEditForm({
    control,
    profilePictureUrl
}: OrgEditFormProps) {
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
            <Controller
                name="description"
                control={control}
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label>Description</FormControl.Label>
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
                            <InputLeftAddon>https://</InputLeftAddon>
                            <HFInput {...props} flex={1} />
                        </InputGroup>
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
        </VStack>
    )
}
