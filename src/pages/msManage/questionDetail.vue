<template>
  <div class="question">
    <banner :title="'常见问题'"/>
    <eggCollectBtn class="collectBtn"
          :collection='collection' 
          @touchend.native="changeCollectBtn"
          :style="{top: top}"
          />
    <div class="content">
      <div class="title">
        <h1>{{ questionData.title }}</h1>
      </div>
      <p v-html="myhtml"></p>
    </div>
  </div>
</template>

<script>
import { b64DecodeUnicode, changeImgStyle } from '../../utils/msManage'
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import banner from '../../components/banner'
import eggCollectBtn from '../../components/msManage/eggCollectBtn'
import Vuex, { mapMutations, mapState } from 'vuex'
export default {
  components: { banner, eggCollectBtn },
  data() {
    return {
      questionData: {},
      collection: false,
      questionId: '',
      myhtml: '',
      top: '',
      account: ''
    }
  },
  computed: {
    ...mapState({
     
    })
  },
  created() {
    this.account = this._localAjax().account
    this.questionId = this.$route.query.id
    this.getQuestionDetail(this.questionId)
    this.isIPhoneX()
     //获取收藏列表常见问题路由"/collectList"传过来的常见问题questionId
    // console.log(this.$route.params.questionId);
  },
  methods: {
    getQuestionDetail(id) {
      // axios获取问题详情内容
      indexModel.questionDetail(id, this.account).then(res => {
        if(res.data) {
          this.questionData = res.data
          if(res.data.remark) {
            let temp = res.data.remark
            this.myhtml = changeImgStyle(b64DecodeUnicode(temp))
          }
          this.collection = res.data.collect
        }
      })
    },
      //收藏
    collect() {
      let id = this.questionId
      indexModel.collect(2, id, this.account).then(res => {
        console.log('collect')
      })
    },
    //取消收藏
    cancelCollect() {
      let id = this.questionId
      indexModel.remove(2, id, this.account).then(res => {
        console.log('canclecollect')
      })
    },
    // 切换收藏按钮
    changeCollectBtn() {
      this.collection = !this.collection
      if(this.collection) {
        //收藏接口
        this.collect()
      }else {
        //移除收藏接口
        this.cancelCollect()
      }
    },
    //收藏的样式
     isIPhoneX (){
      let phone = this.phoneSize()
      if(phone === 'iphonex') {
        this.top = '11vw'
      }else if(phone === 'iphone') {
        this.top = '6vw'
      }else {
        this.top = '6vw'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.question {
  position: relative;
  .collectBtn {
    position: fixed;
    top: 6vw;
    right: 4.26vw;
    z-index: 99;
  }
  .content {
    word-wrap: break-word !important;
    padding-top: 16vw;
    background:#fff;
    box-shadow:0px 2px 6px 0px rgba(136,136,136,0.2);
    .title {
      border-bottom: 1px solid #e1e1e1;
      padding-right:4.25vw;
      margin-left: 4.25vw;
      box-sizing: border-box;
      h1 {
        white-space:pre-wrap;
        color: #363636;
        font-size: 4.8vw;
        padding-top: 3vw;
        padding-bottom: 3vw;
        width: 76%;
        text-align: center;
        width: 55vw;
        margin: 0 auto;
      }
    }
    p {
      white-space:pre-wrap;
      padding:0 4.25vw;
      color: #666;
      padding-top: 2vw;
      padding-bottom: 4vw;
    }
  }
}
</style>
