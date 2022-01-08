import * as FacebookSession from 'expo-auth-session/providers/facebook'
import * as GoogleSession from 'expo-auth-session/providers/google'
import * as FacebookNative from 'expo-facebook'
import * as FirebaseAuth from 'firebase/auth'
import { mocked } from 'jest-mock'

import * as NativeUtils from '@/utils/native'

export const firebaseAuth = mocked(FirebaseAuth, true)
export const facebookSession = mocked(FacebookSession, true)
export const facebookNative = mocked(FacebookNative, true)
export const nativeUtils = mocked(NativeUtils, true)
export const googleSession = mocked(GoogleSession, true)

type MockRootFieldResolver = Record<string, jest.Mock<any, any>>
type RootField = 'Query' | 'Mutation' | 'Subscription'
export type MockResolvers = Partial<Record<RootField, MockRootFieldResolver>>

export interface RenderOptions<T> {
    resolvers?: MockResolvers
    setup?: T
}
