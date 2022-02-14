import { useOrgCreateMutation } from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'
import { URLRegex } from '@/utils/web'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export type OrgCreateInput = {
    title: string
    description: string
    profilePictureB64: string
}

export const orgCreateSchema = yup.object().shape({
    title: yup.string().required('title is required'),
    email: yup.string(),
    websiteUrl: yup.string().matches(URLRegex, {
        message: 'website must be a url',
        excludeEmptyString: true
    })
})

type OrgCreateFormOptions = {
    onSuccess: (input: OrgCreateInput) => void
}

export default function useOrgCreateForm({ onSuccess }: OrgCreateFormOptions) {
    const [_, createOrg] = useOrgCreateMutation()

    const utils = useForm<OrgCreateInput>({
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

    const onSubmit = utils.handleSubmit(async (input: OrgCreateInput) => {
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
