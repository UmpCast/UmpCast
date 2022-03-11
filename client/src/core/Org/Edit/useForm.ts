import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
    OrgEditScreen_OrganizationFragment,
    useEditOrganizationMutation
} from '@/generated'
import { usePassiveServerErrors } from '@/hooks/form/useServerErrors'
import { URLRegex } from '@/utils/web'

export type OrgEditInput = {
    name: string
    description: string
    logoB64: string
    email: string
    websiteUrl: string
}

export const orgEditSchema = yup.object().shape({
    name: yup.string().required(),
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
    const [{ data: editData }, editOrg] = useEditOrganizationMutation()

    const { reset, setError, control, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            description: '',
            logoB64: '',
            email: '',
            websiteUrl: ''
        },
        resolver: yupResolver(orgEditSchema)
    })

    useEffect(() => {
        if (!org) return

        const { name, description, email, websiteUrl } = org

        reset({
            name,
            description: description ?? '',
            email: email ?? '',
            websiteUrl: websiteUrl ?? ''
        })
    }, [org])

    usePassiveServerErrors(setError, editData?.updateOrganization?.errors)

    const onSubmit = handleSubmit(async (input) => {
        const { data } = await editOrg({
            input: {
                organizationId: id,
                ...input
            }
        })

        const errors = data?.updateOrganization?.errors
        if (errors?.length !== 0) {
            return
        }

        if (onSuccess) onSuccess(input)
    })

    return {
        control,
        onSubmit
    }
}
