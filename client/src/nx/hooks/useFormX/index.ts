import { useForm, UseFormProps } from 'react-hook-form'
import { useCallback } from 'react'

export type InputError = {
    key: string
    message: string
}

export default function useFormX(props: UseFormProps) {
    const formApi = useForm(props)

    const { setError } = formApi

    const setInputErrors = useCallback(
        (errors: InputError[]) => {
            errors?.forEach((err) => {
                if (err)
                    setError(err.key, {
                        message: err.message
                    })
            })
        },
        [setError]
    )

    return {
        ...formApi,
        setInputErrors
    }
}
