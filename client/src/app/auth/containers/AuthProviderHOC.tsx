import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Text } from 'native-base'
import { useQuery } from '@apollo/client'
import { GetUserInfo } from '@/app/common/graphql/queries/__generated__/GetUserInfo'

export enum AppAuthState {
    UNAUTHORIZED,
    UNREGISTERED,
    AUTHORIZED
}

export interface AuthProviderHOCProps {
    render: (state: AppAuthState) => JSX.Element
}

export default function AuthProviderHOC({ render }: AuthProviderHOCProps) {
    const [authState, setAuthState] = useState<AppAuthState | null>(null)
    useQuery<GetUserInfo>()

    useEffect(() => {
        return getAuth().onAuthStateChanged((user) => {
            if (!user) return AppAuthState.UNAUTHORIZED
        })
    }, [])

    if (!authState) return <Text>Loading</Text>

    return render(authState)
}
