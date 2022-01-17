import admin from 'firebase-admin'


const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
})


async function verifyIdToken(token) {
    return await firebaseApp.auth().verifyIdToken(token)
}

export default verifyIdToken
