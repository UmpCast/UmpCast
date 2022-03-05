import { VStack, Text } from 'native-base'
import { Control } from 'react-hook-form'

import SignInButton from '@/core/Auth/SignIn/Solid'
import * as Form from '@/components/Form'

import { CreatePositionInput } from './useForm'

interface CreatePositionFormProps {
    control: Control<CreatePositionInput>
    onSubmit: () => any
}

export default function PositionCreateForm({
    control,
    onSubmit
}: CreatePositionFormProps) {
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
