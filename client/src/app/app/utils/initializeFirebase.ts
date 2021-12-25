import { initializeApp } from 'firebase/app'
import { loadAppExtra } from '../../common/utils/appBuild'

initializeApp(loadAppExtra().FIREBASE_CONFIG)
