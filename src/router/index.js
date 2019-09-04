import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HelloWorld'
import Annonce from '@/components/Annonce'
import CreateAnnonce from '@/components/CreateAnnonce'
import LoginPage from '@/components/LoginPage'
import SignUpPage from '@/components/SignUpPage'
import AcceptedAnnonce from '@/components/AcceptedAnnonce'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/annonce/create',
            name: 'CreateAnnonce',
            component: CreateAnnonce
        },
        {
            path: '/annonce/accepted',
            name: 'annonce acceptées',
            component: AcceptedAnnonce
        },
        {
            path: '/annonce/:id',
            name: 'Home',
            component: Annonce
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/signup',
            name: 'Signup',
            component: SignUpPage
        }
        
    ]
})

