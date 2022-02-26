import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ORG_JOIN_CODE_OFFSET } from '@/constants/server'
import { useOrgJoinMutation } from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'

export interface OrgJoinInput extends Record<'code', string> {}

const orgJoinSchema = yup.object().shape({
    code: yup
        .string()
        .matches(/^\d{6}$/, 'code must be 6 digits')
        .required('code is required')
})

export default function useOrgJoinForm({
    onSuccess
}: {
    onSuccess: (input: OrgJoinInput) => any
}) {
    const [_, joinOrg] = useOrgJoinMutation()

    const defaultValues = {
        code: ''
    }

    const utils = useForm<OrgJoinInput>({
        defaultValues,
        resolver: yupResolver(orgJoinSchema)
    })

    const setServerErrors = useServerErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input) => {
        const id = (Number(input.code) - ORG_JOIN_CODE_OFFSET).toString()

        const { data } = await joinOrg({
            id
        })

        const errors = data?.joinOrganization.errors

        if (errors?.length !== 0) {
            setServerErrors(errors)
            return
        }

        onSuccess(input)
    })

    return {
        ...utils,
        reset: () => utils.reset(defaultValues),
        onSubmit
    }
}
