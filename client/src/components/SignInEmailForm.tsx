import NBController from '@/components/NBController'
import useSignInSendEmail from '@/hooks/useSignInEmailForm'
import { RootStackParamList, RootStackRoutes } from '@/rootStack'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { VStack, Text, FormControl, Input } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GenericButton from './GenericButton'
import { EMAIL_SIGN_IN_KEY } from '@/constants'

type SignInNavigationProp = NativeStackNavigationProp<
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
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        <Input
                            testID="email-input"
                            onChangeText={field.onChange}
                            value={field.value}
                            _focus={{ borderColor: 'indigo.500' }}
                            borderWidth={2}
                            size="lg"
                            placeholder="Enter email address"
                        />
                        <FormControl.ErrorMessage testID="email-error">
                            {fieldState.error?.message}
                        </FormControl.ErrorMessage>
                    </>
                )}
            />
            <GenericButton
                onPress={sendEmail}
                disabled={formState.isSubmitting}
            >
                <Text bold fontSize="lg">
                    Continue with Email
                </Text>
            </GenericButton>
        </VStack>
    )
}
