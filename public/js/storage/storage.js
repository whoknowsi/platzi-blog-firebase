import { getStorage } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"
import Autenticacion from '../auth/auth.js'

class Storage {
    constructor() {
        const auth = Autenticacion.getInstance()
        this.storage = getStorage(auth.app)
    }

    static getInstance() {
        if (!Storage.instance) {
            Storage.instance = new Storage()
        }
        return Storage.instance
    }
}

export default Storage