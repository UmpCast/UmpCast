import { initializeApp } from 'firebase/app'
import * as WebBrowser from 'expo-web-browser'
import { loadAppExtra } from '../../common/utils/appExtra'

initializeApp(loadAppExtra().FIREBASE_CONFIG)

WebBrowser.maybeCompleteAuthSession()
