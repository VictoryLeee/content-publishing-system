<template>
  <div>
    <a-row type="flex" justify="center">
      <h3>登录</h3>
    </a-row>
    <a-row>
      <a-col :span="1" :offset="10">用户名：</a-col>
      <a-col :span="3">
        <a-input type="text" v-model="username" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="1" :offset="10">密码：</a-col>
      <a-col :span="3">
        <a-input type="password" v-model="password" />
      </a-col>
    </a-row>
    <a-row type="flex" justify="center">
      <a-button @click="sumitLogin">提交</a-button>
    </a-row>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      username: "",
      password: "",
      nickname: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    sumitLogin() {
      if (this.username && this.password) {
        let obj = {
          username: this.username,
          password: this.password
        };
        this.$axios
          .post("/api/users/login", obj)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data.msg);
              let token = res.data.token;
              this.$store.commit("login_saveToken", token);
              this.$store.dispatch("getAvatar");
            }
          })
          .catch(err => {
            this.$message.error("登录失败");
          });
      } else {
        this.$message.error("输入项未填写完整");
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
</style>
