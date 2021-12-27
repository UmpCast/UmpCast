import Constants from 'expo-constants'
import { AppExtra } from '@/app/app/utils/appBuild'

export const loadAppExtra = () => Constants.manifest?.extra as AppExtra
