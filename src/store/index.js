import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import common from './modules/common'
import customer from './modules/customer'
import select from './modules/components/select'
import rightContainer from './modules/components/rightContainer'
import dealCustomerList from './modules/components/dealCustomerList'
import dealOrderInfoDetails from './modules/components/dealOrderInfoDetails'
import orderInfoDetails from './modules/components/orderInfoDetails'
import followTrackDetails from './modules/components/followTrackDetails'
import customerHeader from './modules/customer/header'
import serachResult from './modules/customer/serachResult'
import tabStatus from './modules/components/tabStatus'
import orderList from './modules/components/orderList'
import customerScroll from './modules/customer/scroll'
import personMsg from './modules/login/index'
import searchBox from './modules/msManage/searchBox'
import collectArt from './modules/msManage/collectArt'
import collect from './modules/msManage/collect'
import treeList from './modules/msManage/treeList'
import leftNavList from './modules/gallery/index/index'
import productNavList from './modules/gallery/productList/index'
import share from './modules/gallery/share/index'
import loadmore from './modules/msManage/loadmore'

export default new Vuex.Store({
  modules: {
    common,
    customer,
    select,
    rightContainer,
    dealCustomerList,
    dealOrderInfoDetails,
    orderInfoDetails,
    customerHeader,
    followTrackDetails,
    tabStatus,
    orderList,
    serachResult,
    customerScroll,
    personMsg,
    select,
    searchBox,
    collectArt,
    collect,
    treeList,
    leftNavList,
    productNavList,
    share,
    loadmore
  }
})