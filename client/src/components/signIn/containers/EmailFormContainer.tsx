import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useForm } from 'react-hook-form'

import { EMAIL_SIGN_IN_KEY } from '@/constants'
import useSetInputErrors from '@/hooks/useSetInputErrors'
import { RootStackParamList, RootStackRoutes } from '@/navigation/rootStack'
import { getActionCodeSettings } from '@/utils/firebase'

import EmailForm from '../views/EmailForm'
import { useSendSignInLinkMutation } from '@/urql/generated'
import emailSignInSchema, { EmailSignInInput } from '../emailSchema'
import { loadAppExtra } from '@/utils/expo'

type SignInNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    RootStackRoutes.SignIn
>

export default function EmailFormContainer() {
    const navigation = useNavigation<SignInNavigationProp>()
    const [_, sendSignInLink] = useSendSignInLinkMutation()
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
            email: input.email,
            actionCodeSettings: getActionCodeSettings(extra)
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
        <EmailForm
            control={control}
            formState={formState}
            onSubmit={onSendSignInLink}
        />
    )
}
