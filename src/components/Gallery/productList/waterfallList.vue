<template>
  <div class="waterfall">
    <div class="img_icon" :style="{backgroundImage:'url(' + list.image + ')'}"></div>
    <div class="text_box">
      <p class="title">{{ list.goodsName }}</p>
      <div class="type">
        <div class="type_icon" v-for="(el, v) in getLabel(list.label)" :key='v'>
          {{ el }}
        </div>
      </div>
      <p class="price">¥{{ Math.round(list.price*100)/100 }}</p>
      <div class="like_btn" @click.prevent="changLike">
        <img src="../../../assets/imgs/like.png" alt="收藏" v-if="like">
        <img src="../../../assets/imgs/unlike.png" alt="未收藏" v-else>
        <span>{{ num }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../../utils/index'
const indexModel = new IndexModel()
export default {
  props: ['list'],
  data() {
    return {
      like: '',
      account: '',
      num: ''
    }
  },
  watch: {
    list() {
      this.setCollect()
    }
  },
  mounted() {
    this.setCollect()
    this.account = this._localAjax().account
  },
  methods: {
    changLike() {
      if(!this.like) {
        this.collect()
      }else {
        this.cancleCollect()
      }
    },
    //字符串转为数组
    getLabel(label) {
      if(label) {
        return this.list.label.split(',')
      }
    },
    //收藏
    collect() {
      let obj = this.getParmas()
      indexModel.galleryCollect(obj).then(res => {
        if(res.status == 1) {
          this.like = !this.like
          this.num += 1
        }
      })
    },
    //取消收藏
    cancleCollect() {
      let obj = this.getParmas()
      indexModel.galleryCancelCollect(obj).then(res => {
        if(res.status == 1) {
          this.like = !this.like
          this.num -= 1
        }
      })
    },
    //获取参数
    getParmas() {
      let obj = {
        id :this.list.id,
        account : this.account,
        type : 3
      }
      return obj
    },
    //设置收藏参数
    setCollect() {
      this.like = this.list.collect
      this.num = this.list.collections
    }
  }
}
</script>

<style lang="scss" scoped>
.waterfall{
  width: 45.6vw;
  display: flex;
  flex-direction: column;
  position: relative;
  background:rgba(255,255,255,1);
  box-shadow:0px 0.4vw 1.2vw 0px rgba(200,219,239,0.2);
  border-radius:1.33vw; 
  margin-bottom: 2vw;
  height: 68.66vw;
  .img_icon {
    background-size: 100% 100%;
    width: 45.6vw;
    height: 45.6vw;
    border-radius: 1.33vw 1.33vw 0 0;
  }
  .text_box {
    margin-left: 2vw;
    box-sizing: border-box;
    // height: 15vw;
    // display: flex;
    // flex-direction: column;
    .title {
      color: #363636;
      font-size: 3.73vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.8em;
    }
    .type{
      display: flex;
      min-height: 6vw;
    }
    .type_icon {
      font-size: 2.4vw;
      color: #666;
      line-height: 1.4em;
      margin-right: 2vw;
      max-width: 42vw;
      word-wrap:break-word;
      word-break:break-all;
      display: flex;
    }
    .price {
      font-size: 4.8vw;
      color: #e93d3d;
      line-height: 1.4em
    }
    .like_btn {
      position: absolute;
      right: 2vw;
      bottom: 0;
      color: #909090;
      font-size: 3.2vw;
      padding-top: 2vw;
      padding-left: 2vw;
      img {
        width: 3.46vw;
        height: 3.06vw;
      }
    }
  }
  
}

            


</style>

