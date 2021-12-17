import { initializeApp } from 'firebase/app'
import Constants from 'expo-constants'

initializeApp(Constants.manifest?.extra?.FIREBASE_CONFIG)
