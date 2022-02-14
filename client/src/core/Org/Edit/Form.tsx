import { FormControl, InputGroup, InputLeftAddon, VStack } from 'native-base'
import { Control, Controller } from 'react-hook-form'

import HFErrorMessage from '@/lib/HF/ErrorMessage'
import HFFormControl from '@/lib/HF/FormControl'
import HFInput from '@/lib/HF/Input'

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
                control={control}
                name="profilePictureB64"
                render={(props) => (
                    <OrgProfilePictureInput
                        {...props}
                        url={profilePictureUrl}
                    />
                )}
            />
            <Controller
                control={control}
                name="title"
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label isRequired>Title</FormControl.Label>
                        <HFInput {...props} />
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
                        <HFInput {...props} />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
            <Controller
                control={control}
                name="email"
                render={(props) => (
                    <HFFormControl {...props}>
                        <FormControl.Label>Email</FormControl.Label>
                        <HFInput {...props} />
                        <HFErrorMessage {...props} />
                    </HFFormControl>
                )}
            />
            <Controller
                control={control}
                name="websiteUrl"
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
