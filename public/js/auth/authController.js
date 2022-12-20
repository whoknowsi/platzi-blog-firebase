import Autenticacion from './auth.js'

$(() => {
    const auth = Autenticacion.getInstance()

    $("#btnRegistroEmail").click(() => {
        const nombres = $('#nombreContactoReg').val()
        const email = $('#emailContactoReg').val()
        const password = $('#passwordReg').val()
        const auth = Autenticacion.getInstance()
        auth.crearCuentaEmailPass(email, password, nombres)
    })

    $("#btnInicioEmail").click(() => {
        const email = $('#emailSesion').val()
        const password = $('#passwordSesion').val()
        auth.authEmailPass(email, password)
    })

    $("#authGoogle").click(() => {
        auth.authCuentaGoogle()
    })

    $("#authFB").click(() => {
        auth.authCuentaFacebook()
    })

    $("#authTwitter").click(() => {
        auth.authCuentaTwitter()
    })

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close')
        $('#modalRegistro').modal('open')
    })

    $('#btnIniciarSesion').click(() => {
        $('#modalRegistro').modal('close')
        $('#modalSesion').modal('open')
    })

    $('#btnOlvidoPassword').click(async () => {
        const email = $('#emailSesion').val()
        auth.handlePasswordReset(email)
    })

});