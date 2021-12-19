import { initializeApp } from 'firebase/app'
import { loadAppExtra } from './appBuild'

initializeApp(loadAppExtra().FIREBASE_CONFIG)
