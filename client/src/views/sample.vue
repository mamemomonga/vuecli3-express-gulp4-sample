<template>
    <div>
        <p>{{ countNum }}</p>
        <button v-on:click="clickPlus">プラス</button>
        <button v-on:click="clickMinus">マイナス</button>
    </div>
 </template>

<script>
export default {
    name: 'sample',
    computed: {
        countNum() {
            return this.$store.getters.count
        }
    },
    methods: {
        clickPlus() {
            this.$store.dispatch('increment').then(()=>{
                // eslint-disable-next-line
                console.log("OK!")
            })
        },
        clickMinus() {
            this.$store.commit('decrement',10)
        }
    },
    mounted: function() {
        this.$nextTick(()=>{
            // eslint-disable-next-line
            console.log("Mounted!")
        })
    }
}
</script>