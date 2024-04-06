<template>
  <div class="main">
    <h2>{{ title }}</h2>
    <a-button @click="deleteArticle" v-if="allowed">删除</a-button>
    <a-button @click="editArticle" v-if="allowed">修改</a-button>
    <div v-html="content"></div>
    <comments :aid="id" />
  </div>
</template>

<script>
import comments from "./comments.vue";
export default {
  components:{comments},
  data() {
    return {
      title: "",
      content: "",
      username: "",
      nickname:""
    };
  },
  props: {
    id: String
  },
  computed: {
    allowed() {
      return (
        this.$store.state.username == this.username || this.$store.state.role == "admin"
      );
    }
  },
  methods: {
    getLists() {
      this.$axios
        .get("/api/articles/" + this.id)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.title = res.data.body.title;
            this.content = res.data.body.content;
            this.username = res.data.body.username;
            this.nickname = res.data.body.nickname;
          }
        })
        .catch(err => {
          this.$message.error("获取失败");
        });
    },
    deleteArticle() {
      this.$axios
        .delete("/api/articles/" + this.id)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success("文章已删除");
            this.$router.back();
          }
        })
        .catch(err => {
          this.$message.error("删除失败");
        });
    },
    editArticle() {
      this.$router.push("/articleEdit/" + this.id);
    },
  },

  
  created() {
    this.getLists();
  }
};
</script>