<template>
    <div>
        <h1>{{ msg }}</h1>
        <h1 v-text="msgFromFather"></h1>
        <button v-on:click="clickMe">clickMe</button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            msg: "in test.vue msg"
        }
    },
    props: ["msgFromFather"],
    methods: {
        clickMe () {
            alert(this.msgFromFather);
            this.$emit("from-child-msg", this.msg);
        }
    }
}

</script>

<style>
    h1 {
        color: red;
    }
</style>