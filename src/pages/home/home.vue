<template>
  <!--首页-->
  <div class="home">
      <p>{{Home}}</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      Home: '木材'
    }
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .home{
    p{
      font-size: 0.2rem;
    }

    height: 3rem;
    background: red;
  }
</style>
