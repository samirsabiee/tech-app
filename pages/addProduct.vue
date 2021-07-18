<template>
  <div class="p-5">
    <b-form id="addForm" ref="form" @submit.stop.prevent="addProduct">
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
        label-for="input-1"
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
        label-for="input-2"
      >
        <b-form-input
          id="input-4"
          type="text"
          v-model="product.image"
          placeholder="لینک تصویر محصول"
          required
        />
      </b-form-group>

      <!--<b-form-group id="input-group-3" label="انتشار" label-for="input-3">
       <b-form-select
         id="input-3"
         required
         v-model="product.select"
       >
         <b-form-select-option value="1">1</b-form-select-option>
         <b-form-select-option value="2">2</b-form-select-option>
         <b-form-select-option value="3">3</b-form-select-option>
       </b-form-select>
     </b-form-group>-->

      <!--      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">-->
      <!--        <b-form-checkbox-group-->
      <!--          id="checkboxes-4"-->
      <!--          v-model="product.select"-->
      <!--          :aria-describedby="ariaDescribedby"-->
      <!--        >-->
      <!--          <b-form-checkbox v-for="(select,index) in selectOption" :key="index" :value="select.value">{{select.label}}-->
      <!--          </b-form-checkbox>-->
      <!--        </b-form-checkbox-group>-->
      <!--      </b-form-group>-->

      <b-form-radio-group required label="دسته بندی" v-slot="{ ariaDescribedby }">
        <b-form-radio v-for="(category, index) in categories" :key="index" v-model="product.category"
                      :aria-describedby="ariaDescribedby" :value="category">
          {{ category }}
        </b-form-radio>
      </b-form-radio-group>

            <b-form-group label="تاریخ">
              <date-picker :modal="true" from="1400" to="1500" :column="1" mode="single"></date-picker>
            </b-form-group>

      <b-button type="submit" variant="primary">ذخیره</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>

    </b-form>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "addProduct",
    data() {
      return {
        product: {
          title: null,
          price: null,
          description: null,
          image: null,
          category: null
        }
      }
    },

    mounted() {
      if (!this.categories.length)
        this.$store.dispatch('product/fetchCategories')
      if (!this.products.length)
        this.$store.dispatch('product/fetch')
    },

    methods: {
      addProduct() {
        this.$store.dispatch('product/store', this.product)
      }
    },

    computed: {
      ...mapGetters({
        products: 'product/all',
        categories: 'product/categories'
      })
    },
  }
</script>

<style scoped>

</style>
