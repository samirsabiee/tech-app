<template>
  <div class="p-5">
    <b-form v-if="!!product" @submit.stop.prevent="updateProduct">
      <b-form-group
        id="input-group-1"
        label="عنوان محصول:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model="product.title"
          placeholder="عنوان محصول"
          required
        />
      </b-form-group>

      <b-form-group id="input-group-2" label="توضیحات محصول" label-for="input-2">
        <b-form-input
          id="input-2"
          placeholder="توضیحات محصول"
          v-model="product.description"
          required
        />
      </b-form-group>


      <b-form-group
        id="input-group-3"
        label="قیمت محصول:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          type="number"
          v-model="product.price"
          placeholder="قیمت محصول"
          required
        />
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="لینک تصویر محصول:"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          type="text"
          v-model="product.image"
          placeholder="لینک تصویر محصول"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-radio-group required label="دسته بندی" v-slot="{ ariaDescribedby }">
        <b-form-radio v-for="(category, index) in categories" :key="index" v-model="product.category"
                      :checked="isRadioChecked(category)" :aria-describedby="ariaDescribedby"
                      :value="category">
          {{ category }}
        </b-form-radio>
      </b-form-radio-group>

      <b-button type="submit" variant="primary">ذخیره</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>

    </b-form>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "etProduct",

    data() {
      return {
        product: null
      }
    },

    mounted() {
      if (!this.categories.length)
        this.$store.dispatch('product/fetchCategories')
      if (!this.products.length)
        this.$store.dispatch('product/fetch')

      this.findProduct()
    },

    methods: {
      findProduct() {
        this.product = {...this.products.find(product => +product.id === +this.$route.params.id)}
        if (!this.products.length)
          this.$axios.get(`products/${this.$route.params.id}`).then(({data}) => {
            this.product = data
          })
      },

      updateProduct() {
        this.$store.dispatch('product/update', this.product)
      },
      isRadioChecked(category) {
        const isChecked = this.product.category === category
        return isChecked
      }
    },

    computed: {
      ...mapGetters({
        products: 'product/all',
        categories: 'product/categories'
      }),
    },
  }
</script>

<style scoped>

</style>
