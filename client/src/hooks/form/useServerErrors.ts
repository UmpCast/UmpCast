import { useCallback, useEffect } from 'react'
import { UseFormSetError } from 'react-hook-form'

export type InputError =
    | {
          key: string
          message: string
      }
    | null
    | undefined

export default function useServerErrors(setError: UseFormSetError<any>) {
    return useCallback(
        (errors: InputError[] | null | undefined) => {
            if (errors && errors.length === 0) return false

            errors?.forEach((err) => {
                if (err)
                    setError(err.key, {
                        message: err.message
                    })
            })

            return true
        },
        [setError]
    )
}

export function usePassiveServerErrors(
    setError: UseFormSetError<any>,
    errors: InputError[] | null | undefined
) {
    return useEffect(() => {
        if (errors && errors.length === 0) return

        errors?.forEach((err) => {
            if (err)
                setError(err.key, {
                    message: err.message
                })
        })
    }, [setError, errors])
}
