
export default {

    namespaced: true,

    state: () => ({
        isVisible: false,
        type: 'text',
        data: {},
    }),

    mutations: {
      show(state, {type, data}) {
        state.isVisible = true;
        state.type = type;
        state.data = data;
        window.scrollTo(0,0)
      },
      close(state) {
        state.isVisible = false;
        state.type = 'text';
        state.data = {};
      }
    },
    actions: {

    },
    getters: {

    }
}