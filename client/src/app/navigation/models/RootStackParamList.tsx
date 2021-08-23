import { SignupFields } from 'app/signup/models/Signup'

export type RootStackParamList = {
    Landing: undefined
    Signup: { step: number; fields: Partial<SignupFields> }
}
