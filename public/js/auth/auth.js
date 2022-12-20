import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

import firebaseConfig from '../config/firebase-config.js'

class Autenticacion {
  constructor() {
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth()
  }

  //make it singleton
  static getInstance() {
    if (!Autenticacion.instance) {
      Autenticacion.instance = new Autenticacion()
    }
    return Autenticacion.instance
  }

  async signOut() {
    try {
      await signOut(this.auth)
    } catch (error) {
      throw new Error(error)
    }
  }

  getCurrentUser() {
    return this.auth.currentUser
  }

  handleOnAuthStateChanged(callback) {
    onAuthStateChanged(this.auth, callback)
  }

  async handlePasswordReset(email) {
    try {
      await sendPasswordResetEmail(this.auth, email)
      Materialize.toast(`Se ha enviado un correo a ${email} para restablecer la contraseña`, 4000)
    } catch (error) {
      console.error(error.message)
      Materialize.toast(`Error al enviar el correo: ${error.message}`, 4000)
    }
  }

  async authEmailPass(email, password) {
    try {
      const { user } = await signInWithEmailAndPassword(this.auth, email, password)
      if (user.emailVerified) {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
        Materialize.toast(`Bienvenido ${user.displayName}`, 5000)
      }
      else {
        Materialize.toast(`Debes realizar el proceso de verificación`, 4000)
        signOut(this.auth)
      }

      $('.modal').modal('close')
    } catch (error) {
      console.error(error.message)
      Materialize.toast(`Error al autenticar la cuenta: ${error.message}`, 4000)
    }
  }

  async crearCuentaEmailPass(email, password, nombres) {
    try {
      const { user } = await createUserWithEmailAndPassword(this.auth, email, password)

      Materialize.toast(`Bienvenido ${nombres}, debes realizar el proceso de verificación`, 4000)

      await updateProfile(user, { displayName: nombres })
      await sendEmailVerification(this.auth.currentUser, { url: 'http://localhost:3000' })
      signOut(this.auth)

      $('.modal').modal('close')
    } catch (error) {
      console.error(error.message)
      Materialize.toast(`Error al crear la cuenta: ${error.message}`, 4000)
    }
  }

  async authCuentaGoogle() {
    const provider = new GoogleAuthProvider()
    try {
      const { user } = await signInWithPopup(this.auth, provider)
      $('#avatar').attr('src', user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${user.displayName} !! `, 4000)
    } catch (error) {
      console.error(error.message)
      Materialize.toast(`Error al autenticar la cuenta: ${error.message}`, 4000)
    }
  }

  async authCuentaFacebook() {
    const provider = new FacebookAuthProvider()
    try {
      const { user } = await signInWithPopup(this.auth, provider)
      $('#avatar').attr('src', user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${user.displayName} !! `, 4000)
    } catch (error) {
      console.error(error.message)
      Materialize.toast(`Error al autenticar la cuenta: ${error.message}`, 4000)
    }
  }

  async authCuentaTwitter() {
    const provider = new TwitterAuthProvider()
    try {
      const { user } = await signInWithPopup(this.auth, provider)
      $('#avatar').attr('src', user.photoURL)
      $('.modal').modal('close')
      Materialize.toast(`Bienvenido ${user.displayName} !! `, 4000)
    } catch (error) {
      console.error(error.message)
      Materialize.toast(`Error al autenticar la cuenta: ${error.message}`, 4000)
    }
  }
}

export default Autenticacion
