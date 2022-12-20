import Authentication from './auth/auth.js'
import Post from './post/post.js'

$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // TODO: Adicionar el service worker

  // TODO: Registrar LLave publica de messaging

  // TODO: Solicitar permisos para las notificaciones

  // TODO: Recibir las notificaciones cuando el usuario esta foreground

  // TODO: Recibir las notificaciones cuando el usuario esta background

  // Listening real time
  const post = Post.getInstance()
  post.consultarTodosPost()

  const auth = Authentication.getInstance()

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
