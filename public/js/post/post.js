import { collection, addDoc, Timestamp, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'
import FirebaseDB from '../db/firebase-db.js'
import Utilidad from '../util/util.js'

class Post {
    constructor() {
        const firebaseDb = FirebaseDB.getInstance()
        this.db = firebaseDb.db
    }

    static getInstance() {
        if (!Post.instance) {
            Post.instance = new Post()
        }
        return Post.instance
    }

    async crearPost(uid, emailUser, titulo, descripcion, imagenLink, videoLink) {
        try {
            const docRef = await addDoc(collection(this.db, 'posts'), {
                uid,
                author: emailUser,
                titulo,
                descripcion,
                imagenLink,
                videoLink,
                fecha: Timestamp.fromDate(new Date())
            })
        } catch (error) {
            console.error('Error adding document: ', error.message)
        }
    }

    consultarTodosPost() {
        const unsubscribe = onSnapshot(collection(this.db, 'posts'), (querySnapshot) => {
            console.log(querySnapshot)
            $('#posts').html('')
            if (querySnapshot.empty) {
                $('#posts').html(this.obtenerTemplatePostVacio())
                return
            }
            querySnapshot.forEach((doc) => {
                const { author, titulo, descripcion, videoLink, imagenLink, fecha } = doc.data()
                const postHtml = this.obtenerPostTemplate(
                    author,
                    titulo,
                    descripcion,
                    videoLink,
                    imagenLink,
                    Utilidad.obtenerFecha(fecha.toDate())
                )
                $('#posts').append(postHtml)
            })
        })
    }

    consultarPostxUsuario(emailUser) {

    }

    obtenerTemplatePostVacio() {
        return `<article class="post">
        <div class="post-titulo">
            <h5>Crea el primer Post a la comunidad</h5>
        </div>
        <div class="post-calificacion">
            <a class="post-estrellita-llena" href="*"></a>
            <a class="post-estrellita-llena" href="*"></a>
            <a class="post-estrellita-llena" href="*"></a>
            <a class="post-estrellita-llena" href="*"></a>
            <a class="post-estrellita-vacia" href="*"></a>
        </div>
        <div class="post-video">
            <iframe type="text/html" width="500" height="385" src='https://www.youtube.com/embed/bTSWzddyL7E?ecver=2'
                frameborder="0"></iframe>
            </figure>
        </div>
        <div class="post-videolink">
            Video
        </div>
        <div class="post-descripcion">
            <p>Crea el primer Post a la comunidad</p>
        </div>
        <div class="post-footer container">         
        </div>
    </article>`
    }

    obtenerPostTemplate(
        autor,
        titulo,
        descripcion,
        videoLink,
        imagenLink,
        fecha
    ) {
        if (imagenLink) {
            return `<article class="post">
            <div class="post-titulo">
                <h5>${titulo}</h5>
            </div>
            <div class="post-calificacion">
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-llena" href="*"></a>
                <a class="post-estrellita-vacia" href="*"></a>
            </div>
            <div class="post-video">                
                <img id="imgVideo" src='${imagenLink}' class="post-imagen-video" 
                    alt="Imagen Video">     
            </div>
            <div class="post-videolink">
                <a href="${videoLink}" target="blank">Ver Video</a>                            
            </div>
            <div class="post-descripcion">
                <p>${descripcion}</p>
            </div>
            <div class="post-footer container">
                <div class="row">
                    <div class="col m6">
                        Fecha: ${fecha}
                    </div>
                    <div class="col m6">
                        Autor: ${autor}
                    </div>        
                </div>
            </div>
        </article>`
        }

        return `<article class="post">
                <div class="post-titulo">
                    <h5>${titulo}</h5>
                </div>
                <div class="post-calificacion">
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-llena" href="*"></a>
                    <a class="post-estrellita-vacia" href="*"></a>
                </div>
                <div class="post-video">
                    <iframe type="text/html" width="500" height="385" src='${videoLink}'
                        frameborder="0"></iframe>
                    </figure>
                </div>
                <div class="post-videolink">
                    Video
                </div>
                <div class="post-descripcion">
                    <p>${descripcion}</p>
                </div>
                <div class="post-footer container">
                    <div class="row">
                        <div class="col m6">
                            Fecha: ${fecha}
                        </div>
                        <div class="col m6">
                            Autor: ${autor}
                        </div>        
                    </div>
                </div>
            </article>`
    }
}

export default Post