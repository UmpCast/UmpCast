import AsyncStorage from '@react-native-async-storage/async-storage'
import { VStack, Text } from 'native-base'

import * as Form from '@/components/Form'
import { EMAIL_SIGN_IN_KEY } from '@/config/constants/storage'

import useAuthLoginSendEmailLinkForm, {
    AuthLoginSendEmailLinkInput
} from './useForm'
import AuthLoginButton from '@/features/Auth/core/Login/Button'

export default function AuthEmailForm({
    onSend
}: {
    onSend: (input: AuthLoginSendEmailLinkInput) => void
}) {
    const { formState, control, onSubmit } = useAuthLoginSendEmailLinkForm({
        onSuccess: async (input) => {
            await AsyncStorage.setItem(EMAIL_SIGN_IN_KEY, input.email)
            onSend(input)
        }
    })

    return (
        <VStack space={4}>
            <Form.Controller
                control={control}
                name="email"
                render={() => (
                    <Form.Control>
                        <Form.Input
                            _focus={{ borderColor: 'indigo.500' }}
                            borderWidth={2}
                            placeholder="Enter email address"
                            size="lg"
                        />
                        <Form.ErrorMessage />
                    </Form.Control>
                )}
            />
            <AuthLoginButton
                disabled={formState.isSubmitting}
                onPress={onSubmit}
            >
                <Text bold fontSize="lg">
                    Continue with Email
                </Text>
            </AuthLoginButton>
        </VStack>
    )
}
