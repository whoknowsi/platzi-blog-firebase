import Autenticacion from './auth.js'

$(() => {

    //$("#authFB").click(() => );

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
        const auth = Autenticacion.getInstance()
        auth.authEmailPass(email, password)
    })

    $("#authGoogle").click(() => {
        const auth = Autenticacion.getInstance()
        auth.authCuentaGoogle()
    })

    //$("#authTwitter").click(() => //AUTH con Twitter)

    $('#btnRegistrarse').click(() => {
        $('#modalSesion').modal('close')
        $('#modalRegistro').modal('open')
    })

    $('#btnIniciarSesion').click(() => {
        $('#modalRegistro').modal('close')
        $('#modalSesion').modal('open')
    })

});