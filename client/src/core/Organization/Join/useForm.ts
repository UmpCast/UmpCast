import { useOrgJoinMutation } from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

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
    const [{ data: joinData }, joinOrg] = useOrgJoinMutation()

    const defaultValues = {
        code: ''
    }

    const utils = useForm<OrgJoinInput>({
        defaultValues,
        resolver: yupResolver(orgJoinSchema)
    })

    useServerErrors(utils.setError, joinData?.joinOrganization.errors)

    const onSubmit = utils.handleSubmit(async (input) => {
        const { data } = await joinOrg({
            code: input.code
        })

        const errors = data?.joinOrganization.errors

        if (!errors || errors.length > 0) return

        onSuccess(input)
    })

    return {
        ...utils,
        reset: () => utils.reset(defaultValues),
        onSubmit
    }
}
