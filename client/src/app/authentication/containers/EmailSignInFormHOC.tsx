import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import emailVerifCreateSchema, {
    EmailVerifCreateInput
} from '../utils/emailVerifCreateSchema'
import EmailSignInForm from '../components/EmailSignInForm'
import useSendEmailVerification from '../graphql/mutations/sendEmailVerification'
import { UnauthRoutes, UnauthStackParamList } from './UnauthStack'
import useSetInputErrors from '@/app/common/hooks/useSetInputErrors'
import { appNavConfig } from '@/app/app/components/AppNavigationContainer'
import { EMAIL_SIGN_IN_KEY } from '../utils/constants'

type SignInNavigationProp = NativeStackNavigationProp<
    UnauthStackParamList,
    UnauthRoutes.SignIn
>

export default function EmailSignInFormHOC() {
    const navigation = useNavigation<SignInNavigationProp>()
    const [sendEmailVerif] = useSendEmailVerification()
    const { control, handleSubmit, setError, formState } =
        useForm<EmailVerifCreateInput>({
            defaultValues: {
                email: ''
            },
            resolver: yupResolver(emailVerifCreateSchema)
        })
    const setInputErrors = useSetInputErrors(setError)

    const onEmailVerifCreateSubmit = handleSubmit(async (input) => {
        const { data } = await sendEmailVerif({
            variables: {
                input,
                route: appNavConfig.screens[UnauthRoutes.EmailSignInRecieved]
            }
        })
        if (!data) return

        const { sendEmailVerification: res } = data

        if (res.errors) {
            setInputErrors(res.errors)
            return
        }

        await AsyncStorage.setItem(EMAIL_SIGN_IN_KEY, input.email)

        navigation.navigate({
            name: UnauthRoutes.EmailSignInSent,
            params: {
                email: input.email
            }
        })
    })

    return (
        <EmailSignInForm
            control={control}
            formState={formState}
            onSubmit={onEmailVerifCreateSubmit}
        />
    )
}
