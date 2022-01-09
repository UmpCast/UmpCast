import { useCallback } from 'react'
import { UseFormSetError } from 'react-hook-form'

export type InputError = {
    key: string
    message: string
}

export default function useSetInputErrors(setError: UseFormSetError<any>) {
    return useCallback(
        (errors: InputError[]) => {
            errors.forEach((err) => {
                setError(err.key, {
                    message: err.message
                })
            })
        },
        [setError]
    )
}