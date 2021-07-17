export const state = () => ({
  products: []
})

export const mutations = {
  addProduct(state, product) {
    state.products.push(product)
  }
}

export const actions = {
  async fetchProducts({commit}) {
    const product = await this.$axios.get('product')
    commit('addProduct',product)
  }
}

export const getters = {
  getProducts(state) {
    return state.products
  }
}
