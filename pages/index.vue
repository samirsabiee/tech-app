<template>
  <div class="page-container p-5">

    <!-- Main container -->
    <div class="main-container">

      <!-- Main content -->
      <div class="main-content">
        <div class="row">
          <div class="col-lg-12 animatedParent animateOnce z-index-49">
            <div class="panel panel-default animated fadeInUp">
              <div class="panel-heading clearfix d-flex flex-row">
                <h3 class="panel-title">لیست محصولات</h3>
                <nuxt-link to="/addProduct"><i class="fas fa-plus m-2"></i>افزودن</nuxt-link>
              </div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-md-12 animatedParent animateOnce z-index-50">
                    <div class="table-responsive">
                      <table class="table table-striped table-border table-hover dataTables-example">
                        <thead>
                        <tr>
                          <th>#</th>
                          <th>___</th>
                          <th>نام</th>
                          <th>قیمت</th>
                          <th>دسته بندی</th>
                          <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(product,index) in products" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td>
                            <img style="max-width: 50px" :src="product.image" class="img-table" alt="image">
                          </td>
                          <td>{{ product.title }}</td>
                          <td>$ {{ product.price }}</td>
                          <td>{{ product.category }}</td>
                          <td>
                            <a href="#">
                              <i class="fa fa-pencil mx-2 blue"></i>
                            </a>
                            <nuxt-link :to="`/etProduct/${product.id}`" class="btn close-icon">
                              <i class="fa fa-pen mx-2 red"></i>
                            </nuxt-link>
                            <button @click="delProduct(product.id)" class="close-icon">
                              <i class="fa fa-times mx-2 red"></i>
                            </button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /main content -->

    </div>
    <!-- /main container -->

  </div>
</template>

<script>
  import jalali from 'jalali-moment'
  import { mapGetters } from 'vuex'

  export default {
    name: 'index',

    mounted() {
      if (!this.categories.length)
        this.$store.dispatch('product/fetchCategories')
      if (!this.products.length)
        this.$store.dispatch('product/fetch')
    },

    methods: {
      toPersianDate(date){
        return jalali(date).locale('fa').format('YYYY/M/D');
      },
      delProduct(id){
        this.$store.dispatch('product/delete', id)
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
