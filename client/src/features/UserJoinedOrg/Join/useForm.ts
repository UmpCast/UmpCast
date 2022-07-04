import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ORG_JOIN_CODE_OFFSET } from '@/config/constants/server'
import { useOrgJoinMutation } from '@/graphql/generated'

export interface UserJoinedOrgJoinInput extends Record<'code', string> {}

const orgJoinSchema = yup.object().shape({
    code: yup
        .string()
        .matches(/^\d{6}$/, 'must be 6 digits')
        .required()
})

const orgJoinDefaultValues = {
    code: ''
}

export default function useUserJoinedOrgJoinForm() {
    const [_, joinOrg] = useOrgJoinMutation()

    const HF = useForm<UserJoinedOrgJoinInput>({
        defaultValues: orgJoinDefaultValues,
        resolver: yupResolver(orgJoinSchema)
    })

    const handleSubmit = (
        onSuccess: (input: UserJoinedOrgJoinInput) => any = () => {}
    ) =>
        HF.handleSubmit(async (input) => {
            const organizationId = (
                Number(input.code) - ORG_JOIN_CODE_OFFSET
            ).toString()

            const { data } = await joinOrg({
                input: {
                    organizationId
                }
            })

            const success = data?.joinOrganization?.success ?? false
            if (!success) {
                HF.setError('code', { message: 'Invalid code' })
                return
            }

            onSuccess(input)
        })

    const reset = () => HF.reset(orgJoinDefaultValues)

    const { control } = HF

    return {
        control,
        reset,
        handleSubmit
    }
}
