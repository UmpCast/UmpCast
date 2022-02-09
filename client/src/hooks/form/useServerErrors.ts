import { useEffect } from 'react'
import { UseFormSetError } from 'react-hook-form'

export type InputError =
    | {
          key: string
          message: string
      }
    | null
    | undefined

export default function useServerErrors(
    setError: UseFormSetError<any>,
    errors: InputError[] | undefined | null
) {
    useEffect(() => {
        errors?.forEach((err) => {
            if (err)
                setError(err.key, {
                    message: err.message
                })
        })
    }, [errors, setError])
}
