<template>
  <div class="p-5">
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Your Name:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model="product.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Text:" label-for="input-2">
        <b-form-input
          id="input-2"
          placeholder="Enter text"
          v-model="product.text"
          required
        ></b-form-input>
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

      <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkboxes-4"
          v-model="product.select"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox v-for="(select,index) in selectOption" :key="index" :value="select.value">{{select.label}}
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group label="نوع" v-slot="{ ariaDescribedby }">
        <b-form-radio v-for="(radio,index) in radioOption" :key="index" v-model="product.radio"
                      :aria-describedby="ariaDescribedby" :value="radio.value">{{radio.label}}
        </b-form-radio>
      </b-form-group>

      <b-form-group label="تاریخ">
        <date-picker v-model="product.date" :modal="true" from="1400" to="1500" :column="1" mode="single"></date-picker>
      </b-form-group>

      <b-button @click="addProduct" variant="primary">ذخیره</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>

    </b-form>
  </div>
</template>

<script>
  export default {
    name: "addProduct",
    data() {
      return {
        selectOption: [],
        radioOption: [
          {label: 'تست یک', value: 'test1'},
          {label: 'تست دو', value: 'test2'}
        ],
        product: {
          name: '',
          text: '',
          select: [],
          radio: '',
          date: ''
        }
      }
    },
    mounted() {
      this.getOptions()
    },
    methods: {
      async addProduct() {
        const newProduct = await this.$axios.post('product', {
          ...this.product,
          select: this.product.select.join(' ')
        })
        console.log(newProduct)
      },
      getOptions() {
        this.$axios.$get('get/select/options').then(({data}) => {
          this.selectOption = data
        })
      }
    },
  }
</script>

<style scoped>

</style>
