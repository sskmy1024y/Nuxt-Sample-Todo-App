import Vue from 'vue'
import Vuex from 'vuex'

export default() => new Vuex.Store({
    state: {
        todos: [],
        number: 2,
        isConnection: false
    },
    actions: {
        async addTodo ({commit}, text) {
            if (!text) return false
            const data = {
                text: text,
                done: false,
                timestamp: new Date()
            }
            commit('setConnection', true)
            const docRef = await this.$db.collection('todos').add(data)
            // await this.$db.collection('todos').doc(docRef.id).set({
            //     id: docRef.id
            // }, {merge:true})
            commit('setConnection', false)
            commit('ADD_TODO', {
                id: docRef.id,
                ...data
            })
        },
        async getTodos({ commit }) {
            commit('RESET_TODO');
            const snapshots = await this.$db.collection('todos').orderBy('timestamp', 'desc').get()
            snapshots.forEach(todo => {
                commit('set_todo', {
                    id: todo.id,
                    ...todo.data()
                })
            })
        },
        async remove ({commit}, id) {
            const snapshots = await this.$db.collection('todos').doc(id).delete()
            commit('REMOVE_TODO', id)
        },
        async reset ({commit}, id) {
            const snapshots = await this.$db.collection('todos').delete()
            commit('RESET_TODO')
        },
        async toggle({commit}, todo) {
            const snapshots = await this.$db.collection('todos').doc(todo.id).set({
                done: !todo.done
            }, {merge: true});
            todo.done = !todo.done
        }
    },
    mutations: {
        setConnection: (state, isConnection) => {
            state.isConnection = isConnection
        },
        set_todo: (state, obj) => {
            obj.timestamp = new Date(obj.timestamp)
            state.todos.push(obj)
        },
        ADD_TODO: (state, data) => {
            state.todos.push(data)
        },
        REMOVE_TODO: (state, id) => {
            state.todos = state.todos.filter(itm => itm.id != id)
        },
        RESET_TODO: (state) => {
            state = {todos:[], number:0}
        },
        TOGGLE: (state, todo) => {
            state.todos.forEach((_todo) => {
                if (todo == _todo) {
                    _todo.done = !_todo.done
                }
            })
        }
    },
    getters: {
        getTodos: state => state.todos,
        number: state => state.number
    }
})