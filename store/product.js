export const state = () => ({
  products: [],
  categories: []
})

export const mutations = {
  PUSH(state, product) {
    state.products.unshift(product)
  },
  SET(state, products) {
    state.products = products
  },
  REPLACE(state, product) {
    const index = state.products.findIndex(prod => +prod.id === +product.id)
    state.products[index] = product
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  REMOVE(state, id) {
    state.products = state.products.filter(product => +product.id !== +id)
  }
}

export const actions = {
  fetchCategories({ commit }) {
    this.$axios.get('products/categories').then(({data}) => {
      commit('SET_CATEGORIES', data)
    })
  },
  fetch({ commit }) {
    this.$axios.get('products').then(({data}) => {
      commit('SET', data)
    })
  },
  store({ commit }, payload) {
    this.$axios.post('products', payload).then(({data}) => {
      commit('PUSH', data)
      this.$router.push('/')
    })
  },
  update({ commit }, payload) {
    this.$axios.put(`products/${payload.id}`, payload).then(({data}) => {
      commit('REPLACE', data)
      console.log('update done')
      this.$router.push('/')
    })
  },
  delete({ commit }, id) {
    this.$axios.delete(`products/${id}`).then(({data}) => {
      commit('REMOVE', id)
    })
  },
}

export const getters = {
  all: (state) => {
    return state.products
  },
  categories: (state) => {
    return state.categories
  },
}
