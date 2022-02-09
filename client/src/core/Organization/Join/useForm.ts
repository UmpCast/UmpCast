import { useOrgJoinMutation } from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface OrgJoinFormInput extends Record<'code', string> {}

const orgJoinSchema = yup.object().shape({
    code: yup
        .string()
        .matches(/^\d{6}$/, 'code must be 6 digits')
        .required('code is required')
})

export default function useOrgJoinForm() {
    const [{ data: joinData }, joinOrg] = useOrgJoinMutation()

    const utils = useForm<OrgJoinFormInput>({
        defaultValues: {
            code: ''
        },
        resolver: yupResolver(orgJoinSchema)
    })

    useServerErrors(utils.setError, joinData?.joinOrganization.errors)

    const onSubmit = utils.handleSubmit(async (input) => {
        await joinOrg({
            code: input.code
        })
    })

    return {
        ...utils,
        onSubmit
    }
}
