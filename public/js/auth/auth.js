import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

class Autenticacion {
  constructor() {
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

  authCuentaFacebook() {
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
  }

  authTwitter() {
    // TODO: Crear auth con twitter
  }
}

export default Autenticacion
