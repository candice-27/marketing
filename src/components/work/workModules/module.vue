<template>
  <li class="module">
    <div :style="{
      background: `url(./static/images/work/${obj.icon}.png)`,
      backgroundSize: '100%'
    }"></div>
    <h3>{{obj.title}}</h3>
  </li>
</template>

<script>
export default {
  name: 'module',
  props: ['obj'],
  data() {
    return{

    }
  },
  mounted(){

  },
  created(){

  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
  .module{
    width: 20vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
      width: 13.3vw;
      height: 13.3vw;
    }
    h3{
      font-size: 14px;
      color: #363636;
    }
  }
</style>

