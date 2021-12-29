import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as yup from 'yup'
import EmailSignInForm from '../components/EmailSignInForm'
import useSendEmailVerification from '../graphql/mutations/sendEmailVerification'
import { UnauthRoutes, UnauthStackParamList } from './UnauthStack'
import useSetInputErrors from '@/app/common/hooks/useSetInputErrors'
import { appNavConfig } from '@/app/app/components/AppNavigationContainer'
import { EMAIL_SIGN_IN_KEY } from '../utils/constants'
import { AppExtra, loadAppExtra } from '@/app/common/utils/appExtra'

export type EmailVerifCreateInput = {
    email: string
}

const emailVerifCreateSchema = yup.object().shape({
    email: yup.string().email().required()
})

export const getActionCodeSettings = (extra: AppExtra) => {
    const {
        APP_URL,
        APP_PACKAGE_NAME,
        ANDROID_MINIMUM_VERSION,
        DYNAMIC_LINK_DOMAIN
    } = extra

    return {
        url: new URL(appNavConfig.screens.EmailSignInReceived, APP_URL).href,
        iosBundleId: APP_PACKAGE_NAME,
        androidPackageName: APP_PACKAGE_NAME,
        dynamicLinkDomain: DYNAMIC_LINK_DOMAIN,
        androidMinimumVersion: ANDROID_MINIMUM_VERSION
    }
}

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
        const extra = loadAppExtra()

        const { data } = await sendEmailVerif({
            variables: {
                email: input.email,
                actionCodeSettings: getActionCodeSettings(extra)
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
