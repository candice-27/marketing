<template>
  <ul class="orderCentent">
    <Loadmore
    :top-method="loadTop"
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    ref="loadmore"
    :auto-fill="false">
      <li
      is="orderLi"
      v-for="(item, index) in orderList"
      :key="`orderList${index}`"
      @click.native="toOrderDetail(item.orderId)"
      :obj="item"></li>
    </Loadmore>
  </ul>
</template>

<script>
import Vue from 'vue'
import Vuex, { mapMutations, mapGetters, mapState } from "vuex";
import { Loadmore } from "mint-ui";
Vue.component(Loadmore.name, Loadmore);
import TopBar from "../../customer/topBar";
import orderLi from "./orderLi";
import { IndexModel } from "../../../utils/"
const indexModel = new IndexModel()
export default {
  name: 'orderCentent',
  props: [],
  components: {
    Loadmore,
    orderLi
  },
  data() {
    return {
      topbar: {
        leftTitle: "客户信息",
        centerTitle: "订单交期",
        rightTitle: "订单状态"
      },
      allLoaded: false
    }
  },
  computed: {
    ...mapState({
      orderData: state => state.work.orderData,
      orderSearchParam: state => state.work.orderSearchParam
    }),
    ...mapGetters(['orderList'])
  },
  mounted() {
    console.log(this)
    let params = {
      page: 1,
      limit: 30
    }
    this.setOrderSearchParam(params)
    this.getOrderList(params)
  },
  methods: {
    ...mapMutations([
      "setOrderData",
      "setOrderSearchParam"
    ]),
    getOrderList(obj) {
      indexModel.getOrderList(obj).then((res) => {
        res = res.data
        if (res) {
          let target = this.orderData.records || []
          let arr = res.records
          res.records = target.concat(arr)
          this.setOrderData(res)
          console.log(res)
        }
      })
    },
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
      console.log('上拉刷新')
    },
    //下拉刷新
    loadBottom() {
      this.orderSearchParam.page++
      this.getOrderList({
        page: this.orderSearchParam.page,
        limit: 30
      })
      // this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded()
    },
    toOrderDetail(orderId) {
      this.$router.push({path: `/orderDetail/${orderId}`})
    }
  }
}
</script>

<style lang="scss" scoped>
  .orderCentent{
    position: relative;
    // z-index: -1;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 58.276vw 4.8vw 10.8vw 4.8vw;
    // margin-top: -58.276vw;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
  }
</style>

