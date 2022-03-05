import { VStack, Text } from 'native-base'
import { Control } from 'react-hook-form'

import SignInButton from '@/core/Auth/SignIn/Solid'

import { DivisionCreateInput } from './useForm'
import * as Form from '@/components/Form'

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
                name="name"
                control={control}
                render={() => {
                    return (
                        <Form.Control>
                            <Form.Input />
                            <Form.ErrorMessage />
                        </Form.Control>
                    )
                }}
            />
            <SignInButton disabled={false} onPress={onSubmit}>
                <Text bold fontSize="lg">
                    Create
                </Text>
            </SignInButton>
        </VStack>
    )
}
