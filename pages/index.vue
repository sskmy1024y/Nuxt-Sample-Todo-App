<template>
  <el-form label-width="100px">
    <el-form-item v-for="todo in todos" :key="todo.id">
      <el-checkbox type="checkbox" :checked="todo.done" @change="toggle(todo)"></el-checkbox>
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <el-button size="sm" @click="remove(todo.id)">remove</el-button>
    </el-form-item>
    <el-form-item>
      <el-input
        placeholder="What needs to be done?"
        @keyup.enter.native="addTodo(addForm.todoText)"
        v-model="addForm.todoText"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  asyncData() {
    return {
      addForm: {
        todoText: ""
      }
    };
  },
  async fetch({ store }) {
    await store.dispatch("getTodos");
  },
  computed: {
    ...mapGetters({ todos: "getTodos" })
  },
  methods: {
    ...mapActions(["addTodo", "remove", "reset", "toggle"])
  }
};
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
