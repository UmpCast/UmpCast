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
    errors: InputError[] | undefined | null,
    setError: UseFormSetError<any>
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
