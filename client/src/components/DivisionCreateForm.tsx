import { VStack, Text } from 'native-base'
import { Control } from 'react-hook-form'

import * as Form from '@/components/Form'

import AuthSignInButton from './AuthSignInButton'
import { DivisionCreateInput } from '../hooks/useDivisionCreateForm'

interface DivisionCreateFormProps {
    control: Control<DivisionCreateInput>
    onSubmit: () => any
}

export default function DivisionCreateForm({
    control,
    onSubmit
}: DivisionCreateFormProps) {
    return (
        <VStack space={4}>
            <Form.Controller
                control={control}
                name="name"
                render={() => (
                    <Form.Control>
                        <Form.Input />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
            <AuthSignInButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Create
                </Text>
            </AuthSignInButton>
        </VStack>
    )
}
