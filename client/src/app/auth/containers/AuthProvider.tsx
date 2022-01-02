import { AuthState, useGetAuthStateQuery } from '@/app/generated-types'

export interface AuthProviderProps {
    render: (state: AuthState) => JSX.Element
}

export default function AuthProvider({ render }: AuthProviderProps) {
    const { data } = useGetAuthStateQuery()

    if (!data?.authState) return null

    return render(data.authState)
}
