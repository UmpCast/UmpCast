import { initializeApp } from 'firebase/app'
import { loadAppExtra } from '../../common/utils/appExtra'

initializeApp(loadAppExtra().FIREBASE_CONFIG)
