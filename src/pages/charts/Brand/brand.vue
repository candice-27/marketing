<!-- <keep-alive> -->
<template>
  <div class="brand paddingTop">
    <mybanner :title='title' />
    <SelectComponent></SelectComponent>
    <ul>
      <li v-for="(item, index) in brandData.series" :key="`${index}11`">
        <div v-show="!brandShow" class="barBox">
          <!-- <chartsTit :text="index === 0 ? `整体${typeName}占比` : ''"></chartsTit> -->
          <Pie
          v-show="!brandPieShow[index]"
          :yAxisData="brandData.yAxisData"
          :seriesData="item.data"
          :title="`各${typeName}金额占比-${item.name}`"
          :category="`整体${typeName}占比`"
          :height="120"></Pie>
          <noData v-show="brandPieShow[index]"></noData>
        </div>
      </li>
      <li>
        <div class="barBox">
          <!-- <chartsTit :text="'整体销售额对比'"></chartsTit> -->
          <chartsTit :text="`各${typeName}销售额对比`">
            <h6>单位：万元</h6>
          </chartsTit>
          <!-- <div ref="brandContainer" ></div> -->
          <Bar
          v-show="!brandShow"
          @chartsClick="chartsEvent"
          :data="brandData"
          :vertical="'horizontal'"
          :title="`各${typeName}金额对比`"
          :height="120"
          :salesVal="true"></Bar>
          <noData v-show="brandShow"></noData>
        </div>
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in categoryData.series" :key="`${index}11`">
        <div v-show="!categoryShow" class="barBox">
          <!-- <chartsTit :text="'整体品类对比'"></chartsTit> -->
          <Pie
          v-show="!categoryPieShow[index]"
          :yAxisData="categoryData.yAxisData"
          :seriesData="item.data"
          :title="`各${typeName}数量占比-${item.name}`"
          :category="`各${typeName}数量占比`"
          :height="120"></Pie>
          <noData v-show="categoryPieShow[index]"></noData>
        </div>
      </li>
      <li>
        <div class="barBox">
          <!-- <chartsTit :text="'整体销售额对比'"></chartsTit> -->
          <chartsTit :text="`各${typeName}数量对比`"></chartsTit>
          <!-- <div ref="categoryContainer" ></div> -->
          <Bar
          v-show="!categoryShow"
          :data="categoryData"
          :vertical="'horizontal'"
          :title="`各${typeName}数量对比`"
          :height="120"></Bar>
          <noData v-show="categoryShow"></noData>
        </div>
      </li>
    </ul>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import mango from '../../../js'
import chartsInit,{chanrtDom, emptyData, emptyPieData} from '../../../utils/chartsInit'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
import SelectComponent from '../../../components/select/selectComponent'
Vue.use(VueRouter)
Vue.use(Vuex)
import Bar from '../../../components/charts/bar'
import Pie from '../../../components/charts/pie'
import chartsTit from '../../../components/charts/title'
import RouterLink from '../../../components/charts/routerLink'
import mybanner from '../../../components/banner'
import noData from '../../../components/charts/noData'
export default {
  name: 'brand',
  components: {
    Bar, Pie, chartsTit, RouterLink, mybanner, SelectComponent, noData
  },
  data () {
    return {
      ajaxData: {},
      brandData: {}, 
      categoryData: {},
      type: this.$route.query.type,
      typeName: this.$route.query.type === 'brand' ? '品牌' : '品类',
      port: this.$route.query.type === 'brand' ? '/v1/app/report/brand/proportion' : '/v1/app/report/category/proportion',
      title:'',
      endTime: mango.getLocalTime('end'),
      key1:false,
      key2:false,
      brandchanrtDom1:'',
      brandchanrtDom2:'',
      brandShow: false,
      categoryShow: false,
      i: 0,
      brandPieShow: [false, false],
      categoryPieShow: [false, false]
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
    // this.getBrandData()
    this.title = this.typeName + '报表'
  },
  mounted(){
    // Vue.$set(0, {name: 1})
    this.getBrandData(this.endTime)
    this.getCategoryData(this.endTime)
  },
  computed: {
    test() {
      // console.log(333, this.$store)
    },
    ...mapState({
      // citySelect: state => state.select.citySelect,
      startTimeSelect: state => state.select.startTimeSelect,
      endTimeSelect: state => state.select.endTimeSelect
    })
  },
  watch: {
    endTimeSelect() {
      if (this.endTimeSelect && this.endTimeSelect != '') {
        this.getBrandData(this.endTimeSelect)
        this.getCategoryData(this.endTimeSelect)
      }
    },
    brandData() {
      // 参数说明：查看销售模块样例
      const chartsName = 'brand'
      if(this.key2) {
        if (this[`${chartsName}Data`].series) {
          // // 检测数据是否为空
          // this[`${chartsName}Show`] = emptyData(this[`${chartsName}Data`].series)
          chartsInit(this, chartsName, 'horizontal', true)
          this.brandchanrtDom1 = chanrtDom

          // if(this.i > 1){
            try {
              this.brandchanrtDom1.resize()
            } catch (error) {
              console.log(error)
            }
          // }
        }
      }
    },
    categoryData() {
      // 参数说明：查看销售模块样例
      const chartsName = 'category'
      if(this.key2) {
        if (this[`${chartsName}Data`].series) {
          // // 检测数据是否为空
          // this[`${chartsName}Show`] = emptyData(this[`${chartsName}Data`].series)
          chartsInit(this, chartsName, 'horizontal')
          this.brandchanrtDom2 = chanrtDom
          // if(this.i > 1) {
            try {
              this.brandchanrtDom2.resize()
            } catch (error) {
              console.log(error)
            }
          // }
          
        }
      }
    }
  },
  beforeDestroy(){
     //销毁实例
    if(this.brandchanrtDom1) {
      this.brandchanrtDom1.dispose()
    }
    if(this.brandchanrtDom2) {
      this.brandchanrtDom2.dispose()
    }
  },
  methods:{
    goToChild() {
      this.$router.push({ path: '/child' })
    },
    // ajax请求
    getBrandData(date) {
       this.i += 1
      mango.loading('open')
      let _this = this
      mango.getAjax(this.port, {
        tenantId: this.ajaxData.tenantId,
        date: date,
        type: 'sum'
      }).then((res) => {
        mango.loading('close')
        if (res) {
          this.key1 = true
          res = res.data
          // 过滤数组
          // let tempArr = res.yAxisData.map((item) => {
          //   let arr = item.split('-')
          //   return arr[1]
          // })
          // res.yAxisData = tempArr
          // console.log('数据:', res)
          _this.brandData = res
          // 判断对应的饼图数据是否为空
          let series = res.series
          if (series) {
            series.forEach((element, index) => {
              console.log('seriesData', series[index])
              this.brandPieShow[index] = emptyPieData(series[index].data)
            })
          }
          // 检测数据是否为空
          this.brandShow = emptyData(res.series)
        }
      })
    },
    getCategoryData(date) {
      mango.loading('open')
      let _this = this
      mango.getAjax(this.port, {
        tenantId: this.ajaxData.tenantId,
        date: date,
        type: 'count'
      }).then((res) => {
         mango.loading('close')
        if (res) {
          this.key2 = true
          res = res.data
          // console.log('品类',)
          _this.categoryData = res
          // 判断对应的饼图数据是否为空
          let series = res.series
          if (series) {
            series.forEach((element, index) => {
              this.categoryPieShow[index] = emptyPieData(series[index].data)
            });
          }
          // 检测数据是否为空
          this.categoryShow = emptyData(res.series)
        }
      })
    },
    chartsEvent(data) {
      if (data.componentType === 'series') {
        this.$router.push({path: '/brandCatogrySales'})
      }
      console.log('报表组件传回的数据：', data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.brand{
  width: 100vw;
  height: 100vh;
  // background: #f8f8f8;
  // padding-top:16.5vw;
}
.main{
  width: 100vw;
  height: 100vw;
}
</style>
 