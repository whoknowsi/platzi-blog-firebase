importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js")

firebase.initializeApp({
    apiKey: "AIzaSyAlA7MZQfJ30O26W5pS832GAKJp6ixSwCg",
    authDomain: "platzi-blog-firebase.firebaseapp.com",
    projectId: "platzi-blog-firebase",
    storageBucket: "platzi-blog-firebase.appspot.com",
    messagingSenderId: "268923211567",
    appId: "1:268923211567:web:ae290ef910a41bd6e41bda",
    measurementId: "G-MSV0R3WLTE"
})

const messaging = firebase.messaging()
messaging.onBackgroundMessage(function (payload) {
    console.log(payload)
    const title = payload.notification.title
    const options = {
        body: payload.notification.body,
        icon: 'icons/icon_new_post.png',
        _click_action: 'https://platzi-blog-firebase.web.app/'
    }
    return self.registration.showNotification(title, options)
})