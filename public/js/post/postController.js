import Post from './post.js'
import Authentication from '../auth/auth.js'

$(() => {
  const post = Post.getInstance()
  const auth = Authentication.getInstance()

  $('#btnModalPost').click(() => {
    $('#tituloNewPost').val('')
    $('#descripcionNewPost').val('')
    $('#linkVideoNewPost').val('')
    $('#btnUploadFile').val('')
    $('.determinate').attr('style', `width: 0%`)
    sessionStorage.setItem('imageLink', null)

    // TODO: Validar que el usuario esta autenticado

    // Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
    $('#modalPost').modal('open')
  })

  $('#btnRegistroPost').click(async () => {
    const user = auth.getCurrentUser()

    if (!user) {
      Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
      return
    }

    const titulo = $('#tituloNewPost').val()
    const descripcion = $('#descripcionNewPost').val()
    const videoLink = $('#linkVideoNewPost').val()
    const imagenLink = sessionStorage.getItem('imageLink') == 'null'
      ? null
      : sessionStorage.getItem('imageLink')

    sessionStorage.setItem('imageLink', null)

    try {
      await post.crearPost(
        user.uid,
        user.email,
        titulo,
        descripcion,
        imagenLink,
        videoLink
      )

      Materialize.toast(`Post creado correctamente`, 4000)
      $('.modal').modal('close')
    } catch (error) {
      Materialize.toast(`Error => ${err}`, 4000)
    }
  })

  $('#btnUploadFile').on('change', e => {
    const user = auth.getCurrentUser()
    if (!user) {
      Materialize.toast(`Para crear el post debes estar autenticado`, 4000)
      return
    }
    const file = e.target.files[0]
    post.subirImagenPost(file, user.uid)
  })
})
