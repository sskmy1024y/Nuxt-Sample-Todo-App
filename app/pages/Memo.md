# Make Memo

## Nuxt Todo App

### nuxtjs setup
```
$ vue init nuxt-community/starter-template <project_name>
$ cd <project_name>
$ npm install
$ npm run dev
```

### add routing

make vue file `pages/todos/index.vue`.
```vue
 <template>
    <div>
      todos
    </div>
  </template>

  <script>
  export default {}
  </script>

  <style>
  </style>
```

restart server. auto make routing `localhost:3000/todos`.

### Enable Vuex

modify `nuxt.config.js`.
```javascript
module.exports = {
    ...
    build {
        vender: [
            'vuex',
        ]
    }
}
```

### Make Vuex Store

make `store/todos.js`.
```javascript
export const state = () => ({
  list: []
})

export const mutations = {
  add (state, text) {
    state.list.push({
      text: text,
      done: false,
      id: state.list.length + 1,
    })
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
```

### Make view

edit index.vue.
```vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo)">remove</button>
    </li>
    <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  computed: {
    todos () { return this.$store.state.todos.list }
  },
  methods: {
    removeTodo (todo) {
      this.$store.commit('todos/remove', todo);
    },
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
```

## FireBase Connect

make .env
```
FB_API_KEY=
FB_AUTH_DOMAIN=
FB_DATABASE_URL=
FB_PROJECTID=
FB_STORAGE_BUCKET=
FB_MESSAGING_SENDER_ID=
```

and install firebase library.

``` 
$ yarn add firebase --save
```