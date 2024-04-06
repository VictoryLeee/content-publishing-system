<template>
  <div>
    <h4>响应式</h4>
    <div>{{ myData }}</div>
    <div>{{ myComputed }}</div>
    <div>{{ myMethod() }}</div>
    <button @click="changeData">改变数据</button>
    <input type="text" v-model="myData" />
     <div>
      <a v-bind:href="url">链接1</a>
    </div>
    <div>
      <a :href="url">链接2</a>
    </div>
     <h4>条件</h4>
    <div v-if="activeIndex == 1">v-if元素1</div>
    <div v-else-if="activeIndex == 2">v-else-if元素2</div>
    <div v-else>v-else元素 其他</div>
        <div v-show="activeIndex == 1">show 元素1</div>
    <div v-show="activeIndex == 2">show 元素2</div>
    <div v-show="activeIndex == 3">show 元素3</div>
    <button @click="changeIndex">改变条件</button>

    <h4>循环</h4>
    <div v-for="item in lists" :key="item.id">
      姓名：{{ item.name }},年龄：{{ item.age }}，<a :href="item.url">网站</a>
      <img :src="item.pic" width="120" />
    </div>
    <h4>axios请求</h4>
    <div>{{msg}}</div>

    <h4>Vuex中保存的登录信息</h4>
    <div>token: {{$store.state.token}}</div>
    <div>username: {{$store.state.username}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myData: "demo1",
      url: "//www.shiyanlou.com",
      activeIndex:1,
      lists: [
        { name: "Pony", age: 18, url: "//www.shiyanlou.com", pic: "https://static.shiyanlou.com/frontend/dist/img/9f43b00.svg" },
        { name: "Jack", age: 20, url: "//www.shiyanlou.com", pic: "https://static.shiyanlou.com/frontend/dist/img/9f43b00.svg" }
      ],
      msg:''
    };
  },
  computed: {
    myComputed() {
      return this.myData + " add computed";
    }
  },
  methods: {
    myMethod() {
      return this.myComputed + " add myMethod";
    },
    changeData(){
      this.myData = this.myData +" being changed, "
    },
    changeIndex() {
      this.activeIndex = this.activeIndex > 2 ? 1 : this.activeIndex + 1;
    },
  },

  created() {
     this.$axios.get('/api/articles').then(res=>{
          this.msg=res.data.msg
      })
  },

};

</script>