import { VStack } from 'native-base'
import { Control } from 'react-hook-form'

import * as Form from '@/components/Form'

import { OrgCreateInput } from './useForm'

export interface OrgCreateFormProps {
    control: Control<OrgCreateInput>
}

export default function OrgCreateForm({ control }: OrgCreateFormProps) {
    return (
        <VStack space={4}>
            <Form.Controller
                control={control}
                name="title"
                render={() => (
                    <Form.Control>
                        <Form.Label isRequired>Title</Form.Label>
                        <Form.Input size="md" />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
            <Form.Controller
                control={control}
                name="description"
                render={(props) => (
                    <Form.Control>
                        <Form.Label>Description</Form.Label>
                        <Form.TextArea totalLines={2} />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
        </VStack>
    )
}
