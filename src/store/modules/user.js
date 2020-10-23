export default {
    namespaced: true,
    state: {
        id: 0,
        name: localStorage.getItem('name')

    },
    mutations: {
        updateId(state, id) {
            state.id = id
        },
        updateName(state, name) {
            state.name = name
        },
        torge(s, c) {
            s.name = c
            localStorage.setItem('name', c)

        }
    }
}