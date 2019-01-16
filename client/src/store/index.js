'use strict'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0
    },
    getters: {
        count: state => state.count
    },
    mutations: {
        increment: (state, amount) => {
            state.count=state.count+amount
            console.log(`MUTATIONS INCREMENT: ${state.count}`)
        },
        decrement: (state,amount) => {
            state.count=state.count-amount
            console.log(`MUTATIONS DECREMENT: ${state.count}`)
        }
    },
    actions: {
        increment: (ctx) => {
            return new Promise((resolve)=> {
                ctx.commit('increment',15)
                setTimeout(()=> {
                    console.log(`ACTIONS INCREMENT ${ctx.state.count}`)
                    resolve()
                },500)
            })
        }
    }
})

export default store
