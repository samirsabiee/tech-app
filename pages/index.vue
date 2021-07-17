<template>
  <div class="page-container p-5">

    <!-- Main container -->
    <div class="main-container">

      <!-- Main content -->
      <div class="main-content">
        <div class="row">
          <div class="col-lg-12 animatedParent animateOnce z-index-49">
            <div class="panel panel-default animated fadeInUp">
              <div class="panel-heading clearfix">
                <h3 class="panel-title">لیست محصولات</h3>
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
                          <th>تاریخ</th>
                          <th>عملیات</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="product !== null">
                          <td>{{product.id}}</td>
                          <td>
                            <img src="images/macbook-40.jpg" class="img-table" alt="image">
                          </td>
                          <td>{{product.name}}</td>
                          <td>{{toPersianDate(product.date)}}</td>
                          <td>
                            <a href="#">
                              <i class="fa fa-pencil mx-2 blue"></i>
                            </a>
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

    <nuxt-link to="/addProduct">next</nuxt-link>

  </div>
</template>

<script>
  import jalali from 'jalali-moment'
  export default {
    name: 'index',
    data() {
      return {
        product: null
      }
    },
    mounted() {
      this.fetchProduct()
    },
    methods: {
      async fetchProduct() {
       const product = await this.$axios.get('product')
        this.product = product.data.data[0]
      },
      toPersianDate(date){
        return jalali(date).locale('fa').format('YYYY/M/D');
      },
      async delProduct(id){
        await this.$axios.delete(`product/${id}`)
      }
    }
  }
</script>
