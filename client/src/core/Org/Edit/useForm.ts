import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
    OrgEditScreen_OrganizationFragment,
    useOrgEditMutation
} from '@/generated'
import useServerErrors from '@/hooks/form/useServerErrors'
import { URLRegex } from '@/utils/web'
import { useEffect } from 'react'

export type OrgEditInput = {
    title: string
    description: string
    logoB64: string
    email: string
    websiteUrl: string
}

export const orgEditSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
    logoB64: yup.string(),
    email: yup.string().email('email must be valid'),
    websiteUrl: yup.string().matches(URLRegex, {
        message: 'website must be a url',
        excludeEmptyString: true
    })
})

export interface OrgEditFormOptions {
    id: string
    org?: OrgEditScreen_OrganizationFragment | null
    onSuccess?: (input: OrgEditInput) => void
}

export default function useOrgEditForm({
    id,
    org,
    onSuccess
}: OrgEditFormOptions) {
    const [_, editOrg] = useOrgEditMutation()

    const { reset, setError, control, handleSubmit } = useForm({
        defaultValues: {
            title: '',
            description: '',
            logoB64: '',
            email: '',
            websiteUrl: ''
        },
        resolver: yupResolver(orgEditSchema)
    })

    useEffect(() => {
        if (!org) return

        const { title, description, email, websiteUrl } = org

        reset({
            title,
            description: description ?? '',
            email: email ?? '',
            websiteUrl: websiteUrl ?? ''
        })
    }, [org])

    const setServerErrors = useServerErrors(setError)

    const onSubmit = handleSubmit(async (input) => {
        const { data } = await editOrg({
            id,
            input
        })

        const errors = data?.updateOrganization.errors
        if (errors?.length !== 0) {
            setServerErrors(errors)
            return
        }

        if (onSuccess) onSuccess(input)
    })

    return {
        control,
        onSubmit
    }
}
