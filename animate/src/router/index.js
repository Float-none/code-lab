import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import scroller from '@/views/scroller'
import animate from '@/views/animate'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/scroller',
            name: 'scroller',
            component: scroller
        },
        {
            path: '/animate',
            name: 'animate',
            component: animate
        },

    ]
})