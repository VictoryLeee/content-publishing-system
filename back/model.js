let db = require("./db"); //引入Mongoose
let Schema = db.Schema;

let UserSchema = new Schema(
  {
    username: String,
    nickname: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    password: String,
    avatar: String
  },
  { timestamps: true }
);
let ArticleSchema = new Schema(
  {
    userid: String,
    username: String,
    title: String,
    content: String
  },
  { timestamps: true }
);


let CommentSchema = new Schema(
  {
    userid: String,
    username: String,
    title: String,
    content: String,
    articleid: String,
    avatar:String
  },
  { timestamps: true }
);

let Users = db.model("User", UserSchema);
let Articles = db.model("Article", ArticleSchema);
let Comments = db.model("Comment", CommentSchema);

module.exports = { Users, Articles, Comments };