import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EmailSignInForm from '../components/EmailSignInForm_'
import { UnauthRoutes, UnauthStackParamList } from '../components/UnauthStack'
import useSetInputErrors from '@/app/common/hooks/useSetInputErrors'
import { EMAIL_SIGN_IN_KEY } from '../utils/constants'
import { loadAppExtra } from '@/app/common/utils/appExtra'
import emailSignInSchema, { EmailSignInInput } from '../utils/emailSignInSchema'
import getActionCodeSettings from '../utils/getActionCodeSettings'
import { useSendSignInLinkMutation } from '@/app/generated-types'

type SignInNavigationProp = NativeStackNavigationProp<
    UnauthStackParamList,
    UnauthRoutes.SignIn
>

export default function EmailSignInFormHOC() {
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
            onSubmit={onSendSignInLink}
        />
    )
}
