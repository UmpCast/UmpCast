import React from 'react'

import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Center } from 'native-base'

import { RootStackParamList } from 'app/navigation/models/RootStackParamList'

import { SignupFields } from '../models/Signup'
import EmailScreen from './emailForm'
import FullNameScreen from './fullnameForm'

export type SignupScreenRouteProp = RouteProp<RootStackParamList, 'Signup'>

export type SignupScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Signup'
>

export type SignupScreenProps = {
    route: SignupScreenRouteProp
    navigation: SignupScreenNavigationProp
}

const ScreenOrder = [EmailScreen, FullNameScreen]

export default function SignupScreen(props: SignupScreenProps) {
    const {
        route: {
            params: { step, fields }
        }
    } = props

    const SelectedScreen = ScreenOrder[step - 1]
    const isLast = step === ScreenOrder.length

    const onNext = (newFields: Partial<SignupFields>) => {
        const allFields = { ...fields, ...newFields }

        if (isLast) {
            console.log(allFields)
        } else {
            props.navigation.push('Signup', {
                step: step + 1,
                fields: allFields
            })
        }
    }

    return (
        <Center m={4}>
            <SelectedScreen isLast={isLast} onNext={onNext} />
        </Center>
    )
}
