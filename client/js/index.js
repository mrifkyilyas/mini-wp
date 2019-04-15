var serverUrl = 'http://localhost:3000';
const app = new Vue({
    el: '#app',
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data: {
        articles: [],
        filterArticle: [],
        myArticles: [],
        article: null,
        profil: false,
        content: '',
        message: 'lalala',
        showAll: true,
        showOne: false,
        showAllPosts: false,
        myPosts: false,
        formPost: false,
        formUpdate: false,
        id: null,
        modalRead: false,
        file: null,
        islogin: false,
        errorMsg: null,
        loginform: false,
        registerform: false,
        userName: null,


    },
    mounted() {
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.googleLogin
        })
    },
    created() {

        axios
            .get(serverUrl + '/article')
            .then(({ data }) => {
                this.articles = data.reverse()


            })
            .catch((err) => {
                console.log(err)
            })




    },
    methods: {
        restart: function() {
            this.articles = [],
                this.filterArticle = [],
                this.myArticles = [],
                this.article = null,
                this.profil = false,
                this.content = '',
                this.message = 'lalala',
                this.showAll = true,
                this.showOne = false,
                this.showAllPosts = false,
                this.myPosts = false,
                this.formPost = false,
                this.formUpdate = false,
                this.id = null,
                this.modalRead = false,
                this.file = null,
                this.islogin = false,
                this.errorMsg = null,
                this.loginform = false,
                this.registerform = false,
                this.userName = null
        },
    
        timeago: function (date) {
            return moment(date).fromNow()

        },
        dateformat: function (date) {
            return moment(date).format('llll')

        },
        getAllArticles() {
            axios
                .get(serverUrl + '/article')
                .then(({ data }) => {

                    this.articles = data.reverse()

                })
                .catch((err) => {
                    console.log(err)
                })
        },
        postArticle() {
            let formData = new FormData()
            formData.append('file', this.file)
            formData.append('title', this.title)
            formData.append('content', this.content)
            axios
                .post(serverUrl + '/article/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    this.articles.push(data)
                    this.file = ""
                    this.content = ""
                    this.file = null
                    this.home()

                })
                .catch((err) => {
                    console.log(err)
                })

        },
        handleFileUpload(event) {
            console.log('masuk file upload', this.$refs.file.files[0])
            this.file = this.$refs.file.files[0]

        },
        updatingArticle(id) {
            console.log('updateting', this.file)
            let formData = new FormData()
            formData.append('file', this.file)
            formData.append('title', this.title)
            formData.append('content', this.content)
            console.log(formData)
            axios
                .put(serverUrl + `/article/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    console.log(data)
                    this.clear()
                    this.home()
                    this.text = ''

                })

        },
        updateArticle(id) {
            axios
                .get(serverUrl + '/article/' + id)
                .then(({ data }) => {
                    console.log(data)
                    this.clear()
                    this.formUpdateShow()
                    this.content = data.content
                    this.title = data.title
                    this.id = data._id
                    this.file = data.featured_image

                })

        },

        deleteArticle(id) {
            axios
                .delete(serverUrl + '/article/' + id)
                .then(({ data }) => {
                    console.log(data)
                    this.clear()
                    this.home()

                })
                .catch((err) => {
                    console.log(err)
                })

        },
        getOneArticle(id) {
            axios
                .get(serverUrl + '/article/' + id)
                .then(({ data }) => {
                    this.article = data
                    console.log(data)
                    let time = moment().format('llll')
                    console.log(time)
                })
                .catch((err) => {
                    console.log(err)
                })

        },
        getMyPosts() {
            axios
                .get(serverUrl + '/article/user/list')
                .then(({ data }) => {
                    this.myArticles = data
                    console.log(data)

                })
                .catch((err) => {
                    console.log(err)
                })

        },
        readArticle(id) {
            this.getOneArticle(id)
            this.clear()
            this.showOne = true
            console.log('lala')
        },

        filterArticle: function () {
            this.articles = this.unfilterArticle
            this.articles = this.articles.filter(articles => {
                return RegExp(this.filter, 'ig').test(articles.title)
            })
        },
        home: function () {
            this.clear()
            this.restart()
            this.getAllArticles()
            this.showAll = true
            this.formPost = false
            this.formUpdate = false
        },
        clear: function () {
            this.articles = [],
                this.filterArticle = [],
                this.title = '',
                this.text = '',
                this.message = '',
                this.showAll = false,
                this.formPost = false,
                this.showAll = false
            this.showOne = false
            this.formUpdate = false
            this.formPost = false,
                this.loginform = false,
                this.registerform = false,
                this.myPosts = false
            this.profil = false
            this.getOneArticle = false
        },
        formPostShow: function () {
            this.clear()
            this.profil = true
            this.formPost = true

        },
        showMyPosts: function () {
            this.clear()
            this.profil = true
            this.myPosts = true
            this.getMyPosts()

        },
        formUpdateShow: function () {
            this.clear()
            this.formUpdate = true
        },
        loginformshow: function () {
            this.clear()
            this.loginform = true
        },
        registerformshow: function () {
            this.clear()
            this.registerform = true
        },
        login() {
            axios.post(`${serverUrl}/user/login`, {
                email: this.$refs.email.value,
                password: this.$refs.password.value
            })
                .then(({ data }) => {
                    console.log(data.name)
                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('name', data.name)
                    axios.defaults.headers.common['access_token'] = localStorage.access_token
                    this.home()
                    this.islogin = true
                    this.errorMsg = null
                    this.userName = localStorage.name


                })
                .catch(err => {
                    this.errorMsg = 'Wrong email/password'
                    this.$refs.email.value = ""
                    this.$refs.password.value = ""
                    console.log(err.message)
                })
        },
        register() {
            console.log('register')
            axios.post(`${serverUrl}/user/register`, {
                name: this.$refs.name.value,
                email: this.$refs.email.value,
                password: this.$refs.password.value
            })
                .then(({ data }) => {
                    this.registerformshow = false
                    this.loginformshow = true
                    swal('Registration Success!')
                    this.$refs.name = ""
                    this.$refs.email = ""
                    this.$refs.password = ""




                })
                .catch(err => {
                    this.errorMsg = 'Wrong email/password'
                    this.$refs.email.value = ""
                    this.$refs.password.value = ""
                    console.log(err.message)
                })
        },
        logout() {
            console.log('logout')
            this.islogin = false,
                swal('logout!')
            this.errorMsg = null,
                localStorage.clear()
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });

        },

        googleLogin(googleUser) {
            const idToken = googleUser.getAuthResponse().id_token
            axios.post(`${serverUrl}/user/googleLogin`, {
                idToken
            })
                .then(({ data }) => {
                    swal('login Success!')
                    localStorage.setItem('access_token', data.access_token)
                    localStorage.setItem('name', data.name)
                    axios.defaults.headers.common['access_token'] = localStorage.access_token
                    this.home()
                    this.islogin = true
                    this.errorMsg = null
                    this.userName = localStorage.name
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

})

if (localStorage.access_token) {
    app.islogin = true
    axios.defaults.headers.common['access_token'] = localStorage.access_token
    app.userName = localStorage.name
    this.errorMsg = null
}




