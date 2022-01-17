import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { VStack, Text, FormControl, Input } from 'native-base'

import NBController from '@/components/NBController'
import { EMAIL_SIGN_IN_KEY } from '@/constants'
import useSignInSendEmail from '@/hooks/useSignInEmailForm'
import { RootStackParamList, RootStackRoutes } from '@/rootStack'

import GenericButton from './GenericButton'

type SignInNavigationProp = StackNavigationProp<
    RootStackParamList,
    RootStackRoutes.SignIn
>

export default function SignInEmailForm() {
    const navigation = useNavigation<SignInNavigationProp>()
    const { formState, control, handleSendEmail } = useSignInSendEmail()

    const sendEmail = handleSendEmail(async (input) => {
        await AsyncStorage.setItem(EMAIL_SIGN_IN_KEY, input.email)

        navigation.navigate({
            name: RootStackRoutes.SignInEmailSent,
            params: {
                email: input.email
            }
        })
    })

    return (
        <VStack space={4}>
            <NBController
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                    <>
                        <Input
                            _focus={{ borderColor: 'indigo.500' }}
                            borderWidth={2}
                            onChangeText={field.onChange}
                            placeholder="Enter email address"
                            size="lg"
                            testID="email-input"
                            value={field.value}
                        />
                        <FormControl.ErrorMessage testID="email-error">
                            {fieldState.error?.message}
                        </FormControl.ErrorMessage>
                    </>
                )}
            />
            <GenericButton
                disabled={formState.isSubmitting}
                onPress={sendEmail}
            >
                <Text bold fontSize="lg">
                    Continue with Email
                </Text>
            </GenericButton>
        </VStack>
    )
}
