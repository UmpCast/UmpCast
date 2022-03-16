import { VStack } from 'native-base'
import { Control } from 'react-hook-form'

import * as Form from '@/components/Form'
import { OrgCreateInput } from '@/core/Org/Create/useOrgCreateForm'

export interface OrgCreateFormProps {
    control: Control<OrgCreateInput>
}

export default function OrgCreateForm({ control }: OrgCreateFormProps) {
    return (
        <VStack space={4}>
            <Form.Controller
                control={control}
                name="name"
                render={() => (
                    <Form.Control>
                        <Form.Label isRequired>Name</Form.Label>
                        <Form.Input size="md" />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
            <Form.Controller
                control={control}
                name="description"
                render={() => (
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
