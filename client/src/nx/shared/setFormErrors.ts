import { UseFormSetError } from 'react-hook-form'

export type InputError = {
    key: string
    message: string
}

export default function setFormErrors(errors: InputError[], setError: UseFormSetError<any>) {
    errors?.forEach((err) => {
        if (err)
            setError(err.key, {
                message: err.message
            })
    })
}
