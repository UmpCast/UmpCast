import { initializeApp } from 'firebase/app'
import { loadAppExtra } from '@/app/common/utils/appBuild'

initializeApp(loadAppExtra().FIREBASE_CONFIG)
