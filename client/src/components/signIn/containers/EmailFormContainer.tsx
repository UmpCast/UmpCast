import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { EMAIL_SIGN_IN_KEY } from '../../../constants'
import emailSignInSchema, {
    EmailSignInInput
} from '@/validation/signInEmailSchema'
import { RootStackParamList, RootStackRoutes } from '@/navigation/rootStack'
import SignInEmailForm from '../views/EmailForm'
import { useSendSignInLinkMutation } from '@/apollo/generated'
import { loadAppExtra } from '@/utils/extra'
import { getActionCodeSettings } from '@/utils/firebase'
import useSetInputErrors from '@/hooks/useSetInputErrors'

type SignInNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    RootStackRoutes.SignIn
>

export default function EmailFormContainer() {
    const navigation = useNavigation<SignInNavigationProp>()
    const [sendSignInLink] = useSendSignInLinkMutation()
    const { control, handleSubmit, setError, formState } =
        useForm<EmailSignInInput>({
            defaultValues: {
                email: ''
            },
            resolver: yupResolver(emailSignInSchema)
        })
    const setInputErrors = useSetInputErrors(setError)

    const onSendSignInLink = handleSubmit(async (input) => {
        const extra = loadAppExtra()

        const { data } = await sendSignInLink({
            variables: {
                email: input.email,
                actionCodeSettings: getActionCodeSettings(extra)
            }
        })
        if (!data) return

        const { sendSignInLink: res } = data

        if (res.errors) {
            setInputErrors(res.errors)
            return
        }

        await AsyncStorage.setItem(EMAIL_SIGN_IN_KEY, input.email)

        navigation.navigate({
            name: RootStackRoutes.SignInEmailSent,
            params: {
                email: input.email
            }
        })
    })

    return (
        <SignInEmailForm
            control={control}
            formState={formState}
            onSubmit={onSendSignInLink}
        />
    )
}
