Vue.component('navbar-top', {
    template: ` 
    <nav class="navbar navbar-expand-lg navbar-info  bg-info py-0 px-0 my-0 mx-0 fixed-top">
    <a class="navbar-brand text-white bg-dark py-2 px-3" href="#" @click="$parent.home"> <i class="fas fa-carrot"></i>
        TinyWP</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link active text-white" href="#"><i class="far fa-newspaper mr-2"
                        @click="$parent.showAll"></i>Timeline</a>
            </li>
        </ul>
    </div>
    <div class="navbar-collapse float-right"></div>
    <li v-if="$parent.islogin" class="navbar-nav mr-4 ">
        <a href="#" @click="$parent.formPostShow" class="btn btn-light text-info"><i class="fas fa-edit"></i> Write</a>
    </li>
    <li v-if="$parent.islogin" class="navbar-nav mr-4">
        <a href="#" class="text-light"><i class="fas fa-user-circle"></i> halo, {{userName}} </a>
    </li>
    <li v-if="$parent.islogin" class="navbar-nav mr-4 ">
        <a href="#" @click="showMyPosts" class="text-light"><i class="fas fa-align-left mr-2 "></i>Blog
            Posts</a>
    </li>

    <li v-if="$parent.islogin" class="navbar-nav mr-4 ">
        <a href="#" @click="logout" class=text-light>logout</a>
    </li>
    <li v-if="$parent.islogin==false" class="navbar-nav mr-4 ">
        <a href="#" @click="$parent.loginformshow" class="btn btn-light text-info">login</a>
    </li>
    


</nav>
    `, data() {
        userName = this.$parent.userName
    },
    methods: {
       
        showMyPosts: function(){
            this.$parent.clear()
            this.$parent.profil = true
            this.$parent.myPosts = true
            this.$parent.getMyPosts()

        },

    }

})