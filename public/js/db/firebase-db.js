import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js'
import Autenticacion from '../auth/auth.js'

class FirebaseDB {
    constructor() {
        const auth = Autenticacion.getInstance()
        this.db = getFirestore(auth.app)
    }

    static getInstance() {
        if (!FirebaseDB.instance) {
            FirebaseDB.instance = new FirebaseDB()
        }
        return FirebaseDB.instance
    }
}

export default FirebaseDB