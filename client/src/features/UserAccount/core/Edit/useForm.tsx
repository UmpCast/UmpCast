import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { UseUserAccountEditForm_UserFragment } from '@/graphql/generated'

import { userAccountSchema } from '../../utils/schema'

export interface UserAccountEditFormOptions {
    user?: UseUserAccountEditForm_UserFragment | null
}

export type UserAccountEditInput = {
    firstName: string
    lastName: string
    phoneNumber: string | null
    state: string | null
    city: string | null
    streetAddress: string | null
    zipCode: string | null
}

const schema = userAccountSchema

export default function useUserAccountEditForm({
    user
}: UserAccountEditFormOptions) {
    const form = useForm<UserAccountEditInput>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        if (!user) return
        const {
            firstName,
            lastName,
            phoneNumber,
            state,
            city,
            streetAddress,
            zipCode
        } = user

        form.reset({
            firstName,
            lastName,
            phoneNumber,
            state,
            city,
            streetAddress,
            zipCode
        })
    }, [form.reset, user])

    return form
}
