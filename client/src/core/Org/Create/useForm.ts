import { useOrgCreateMutation } from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'
import { URLRegex } from '@/utils/web'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { OrgProfileInput } from '../Profile/Form'

export const orgCreateSchema = yup.object().shape({
    title: yup.string().required('title is required'),
    email: yup.string(),
    websiteUrl: yup.string().matches(URLRegex, {
        message: 'website must be a url',
        excludeEmptyString: true
    })
})

type OrgCreateFormOptions = {
    onSuccess: (input: OrgProfileInput) => void
}

export default function useOrgCreateForm({ onSuccess }: OrgCreateFormOptions) {
    const [_, createOrg] = useOrgCreateMutation()

    const utils = useForm<OrgProfileInput>({
        defaultValues: {
            title: '',
            email: '',
            websiteUrl: '',
            description: '',
            profilePictureUrl: ''
        },
        resolver: yupResolver(orgCreateSchema)
    })

    const setServerErrors = useServerErrors(utils.setError)

    const onSubmit = utils.handleSubmit(async (input: OrgProfileInput) => {
        const { data } = await createOrg({ input })

        const errors = data?.createOrganization.errors

        if (errors?.length !== 0) {
            setServerErrors(errors)
            return
        }

        onSuccess(input)
    })

    return {
        onSubmit,
        ...utils
    }
}
