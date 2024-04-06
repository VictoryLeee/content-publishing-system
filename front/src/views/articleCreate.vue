<template>
  <div class="article-create">
    <h2>{{editMode?"编辑文章":"新增文章"}}</h2>
    <div>
      <a-input v-model="title" size="large" placeholder="输入标题" />
    </div>
    <div ref="editor" class="editor"></div>
    <a-button v-on:click="submitContent">发表</a-button>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editor",
  props: {
    aid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editorContent: "",
      title: ""
    };
  },
  computed: {
    editMode() {
      return this.aid !== "";
    }
  },
  methods: {
    submitContent() {
      let obj = {
        username: this.$store.state.username,
        userid: this.$store.state.userid,
        title: this.title,
        content: this.editorContent
      };
      if (this.editMode) {
        this.$axios
          .put("/api/articles/" + this.aid, obj)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error("修改失败");
          });
      } else {
        this.$axios
          .post("/api/articles", obj)
          .then(res => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data.msg);
            }
          })
          .catch(err => {
            this.$message.error("发表失败");
          });
      }
    }
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.create();
    if (this.editMode) {
      this.$axios
        .get("/api/articles/" + this.aid)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.title = res.data.body.title;
            let content = res.data.body.content;
            editor.txt.html(content);
          }
        })
        .catch(err => {
          this.$message.error("获取失败");
        });
    }
  }
};
</script>