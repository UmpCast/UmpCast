import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ORG_JOIN_CODE_OFFSET } from '@/config/constants/server'
import { useJoinOrganizationMutation } from '@/generated'

export interface OrgMemberJoinInput extends Record<'code', string> {}

const orgJoinSchema = yup.object().shape({
    code: yup
        .string()
        .matches(/^\d{6}$/, 'must be 6 digits')
        .required()
})

const orgJoinDefaultValues = {
    code: ''
}

export default function useOrgMemberJoinForm() {
    const [_, joinOrg] = useJoinOrganizationMutation()

    const HF = useForm<OrgMemberJoinInput>({
        defaultValues: orgJoinDefaultValues,
        resolver: yupResolver(orgJoinSchema)
    })

    const handleSubmit = (
        onSuccess: (input: OrgMemberJoinInput) => any = () => {}
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
