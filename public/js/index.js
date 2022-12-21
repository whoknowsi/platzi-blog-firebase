import Authentication from './auth/auth.js'
import Post from './post/post.js'
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js'
import FirebaseDB from './db/firebase-db.js'
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js'

$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()


  const post = Post.getInstance()
  post.consultarTodosPost()

  const auth = Authentication.getInstance()
  const firebaseDB = FirebaseDB.getInstance()

  Notification.requestPermission((permission) => {
    if (permission === 'granted') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../firebase-messaging-sw.js')
          .then((registration) => {
            const messaging = getMessaging(auth.app)

            getToken(messaging, { vapidKey: 'BGD1-FoXWN9Zc06Q7CFeCEzbWdSyD3_teWwkEBJ2xu5zTsc9GmQPCmXr_H0wYeThEQwfBPAuOJr_vPx1QUfQjnM' })
              .then((token) => {
                const db = firebaseDB.db
                try {
                  setDoc(doc(db, 'tokens', token), {
                    token,
                  })
                } catch (error) {
                  console.error('Error adding document: ', error.message)
                }
              })

            onMessage(messaging, (payload) => {
              console.log(payload)
              Materialize.toast(`${payload.notification.title}: ${payload.notification.body}`, 4000)
            })
          })
      }
    }
  })

  auth.handleOnAuthStateChanged((user) => {
    if (user) {
      $('#btnInicioSesion').text('Salir')
      if (user.photoURL) {
        $('#avatar').attr('src', user.photoURL)
      } else {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }
    } else {
      $('#btnInicioSesion').text('Iniciar Sesión')
      $('#avatar').attr('src', 'imagenes/usuario.png')
    }
  })

  $('#btnInicioSesion').click(async () => {
    const user = auth.getCurrentUser()
    if (user) {
      await auth.signOut()
      $('#btnInicioSesion').text('Iniciar Sesión')
      $('#avatar').attr('src', 'imagenes/usuario.png')
      Materialize.toast(`SignOut correcto`, 4000)
    } else {
      $('#modalSesion').modal('open')
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
  })

  $('#avatar').click(async () => {
    try {
      await auth.signOut()

      $('#avatar').attr('src', 'imagenes/usuario.png')
      Materialize.toast(`SignOut correcto`, 4000)
    } catch (error) {
      console.error(error.message)
      Materialize.toast(`Error al realizar SignOut => ${error.message}`, 4000)
    }
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')
    post.consultarTodosPost()
  })

  $('#btnMisPost').click(() => {

    const user = auth.getCurrentUser()
    if (!user) {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)
      return
    }

    $('#tituloPost').text('Mis Posts')
    post.consultarPostxUsuario(user.email)
  })
})
