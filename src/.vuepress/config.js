module.exports = {
  title: "青青子衿的博客",
  description: "记录工作中学到的知识点。",
  base: "/qq-blog/",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }]
  ],
  theme: "melodydl",
  themeConfig: {
    title: "我的博客",
    personalInfo: {
      name: "青青子衿",
      avatar: "/qq-blog/avatar.jpeg",
      headerBackgroundImg: "/qq-blog/avatar-bg.jfif",
      description: "一枚程序媛，爱工作，爱生活！",
      email: "1350221123@qq.com",
      location: "重庆 渝北"
    },
    nav: [
      {text: "主页", link: "/"},
      {text: "关于", link: "/about/"},
      {text: "标签分类", link: "/tags/"}
    ],
    header: {
      home: {
        title: "主页",
        subtitle: "从事前端开发的程序媛，典型工科女",
        headerImage: "/qq-blog/home-bg.jfif"
      },
      tags: {
        title: "标签",
        subtitle: "知识点记着记着就熟了",
        headerImage: "/qq-blog/tags-bg.jfif"
      },
      postHeaderImg: "/qq-blog/post-bg.jfif"
    },
    sns: {
      github: {
        account: "github",
        link: "https://github.com/FangQingqing"
      }
    },
    footer: false,
    pagination: {
      perPage: 5
    },
    comments: false
  }
}