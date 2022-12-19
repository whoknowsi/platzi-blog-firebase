import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

class Autenticacion {
  autEmailPass(email, password) {
    //$('#avatar').attr('src', 'imagenes/usuario_auth.png')
    //Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
    //$('.modal').modal('close')

  }

  async crearCuentaEmailPass(email, password, nombres) {
    const auth = getAuth()
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      if (user.emailVerified) Materialize.toast(`Bienvenido ${nombres}`, 4000)
      else {
        Materialize.toast(`Bienvenido ${nombres}, debes realizar el proceso de verificación`, 4000)
        $('.modal').modal('close')

        await updateProfile(user, { displayName: nombres })
        console.log(auth.currentUser)
        await sendEmailVerification(auth.currentUser, { url: 'http://localhost:3000' })
        signOut(auth)
      }
    } catch (error) {
      console.error(error.message)
      Materialize.toast(`Error al crear la cuenta: ${error.message}`, 4000)
    }

  }

  authCuentaGoogle() {
    //$('#avatar').attr('src', result.user.photoURL)
    //$('.modal').modal('close')
    //Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000)
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
