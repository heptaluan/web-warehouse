<template>
  <div class="hello">
    <h1 v-text="msg"></h1>
    <ul>
      <input type="text" v-model="newItem" @keyup.enter="addNew">
      <li v-for="item in items" :class="{flag: item.flag}" @click="toggle(item)">
        {{ item.label }}
      </li>
    </ul>
    <p>childSay: {{ childWorlds }}</p>
    <test msgFromFather="233333" v-on:from-child-msg="childSay"></test>
  </div>
</template>

<script>
import Store from "../store";
import Test from "./test"
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items: Store.fetch(),
      newItem: "",
      childWorlds: ""
    }
  },
  components: { Test },
  methods: {
    toggle (item) {
      item.flag = !item.flag;
    },
    addNew () {
      this.items.push({
          label: this.newItem,
          flag: true
        })
      this.newItem = "";
    },
    childSay (msg) {
      this.childWorlds = msg;
    }
  },
  watch: {
    items: {
      handler (items) {
        Store.save(items)
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flag {
  color: red;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
