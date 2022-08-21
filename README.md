# 前言

Github README 主页有很多玩法，例如显示 star 和 commit 数等

之前一直感叹：「**如果在掘金发布的文章列表能自动同步到主页就好了**」

> 每当你在感叹「如果有这样一个东西就好了」的时候，请注意：其实这是你的机会。


经过一番折腾，最终 [效果如下图](https://github.com/Flywith24)：

![结果](https://cdn.jsdelivr.net/gh/Flywith24/Album@master/img/202208140121373.png)

# 使用

[接口文档](https://www.apifox.cn/apidoc/shared-52b5efee-61ee-413f-9e79-cb229415f31a/api-35458819)

![](https://cdn.jsdelivr.net/gh/Flywith24/Album@master/img/202208211052255.png)
## 掘金展示最近 N 篇文章

### 格式

```http
  https://github-readme-juejin-recent-article-flywith24.vercel.app/juejin?id=<id>&limit=<limit>
```

- `id`：掘金 id（掘金个人首页 url 中 user 后面的数字）![](https://cdn.jsdelivr.net/gh/Flywith24/Album@master/img/202208140035222.png)
- `limit`：展示的文章数量

### 示例

``` markdown
[![](https://github-readme-juejin-recent-article-flywith24.vercel.app/juejin?id=219558054476792&limit=2)](https://juejin.cn/user/219558054476792/posts)
```
> 在此示例中，`id` 为 219558054476792，`limit` 为 2，使用超链接将图片包裹，链接地址指向掘金个人主页



### 效果

![](https://github-readme-juejin-recent-article-flywith24.vercel.app/juejin?id=219558054476792&limit=2)

## 小专栏展示最近 N 篇文章

### 格式

```http
https://github-readme-juejin-recent-article-flywith24.vercel.app/xiaozhuanlan?id=<id>&limit=<limit>
```

- `id`：专栏 id（专栏链接最后部分）

  ![](https://cdn.jsdelivr.net/gh/Flywith24/Album@master/img/202208140045507.png)

- `limit`：展示的文章数量



### 示例

``` markdown
[![](https://github-readme-juejin-recent-article-flywith24.vercel.app/xiaozhuanlan?id=detail&limit=2)](https://xiaozhuanlan.com/detail)
```

> 在此示例中，`id` 为 detail，`limit` 为 2，使用超链接将图片包裹，链接地址指向专栏主页
>



### 效果

![](https://github-readme-juejin-recent-article-flywith24.vercel.app/xiaozhuanlan?id=detail&limit=2)



某些场景我们希望只展示某几篇代表文章，此时可以使用「展示特定文章」

## 展示特定文章

### 格式

``` 
https://github-readme-juejin-recent-article-flywith24.vercel.app/{type}/{id}/{index}
```

- `type`：`juejin` 或 `xiaozhuanlan`
- `id`：规则同上
- `index`：位置，**0 代表最新** 的文章



### 示例

```markdown
[![](https://github-readme-juejin-recent-article-flywith24.vercel.app/juejin/219558054476792/6)](https://github-readme-juejin-recent-article-flywith24.vercel.app/juejin/219558054476792/6)

[![](https://github-readme-juejin-recent-article-flywith24.vercel.app/xiaozhuanlan/detail/7)](https://github-readme-juejin-recent-article-flywith24.vercel.app/xiaozhuanlan/detail/7)
```

> 在此示例中，分别展示了第 7 和 第 8 篇文章
>


### 效果

[![](https://github-readme-juejin-recent-article-flywith24.vercel.app/juejin/219558054476792/6)](https://github-readme-juejin-recent-article-flywith24.vercel.app/juejin/219558054476792/6)

[![](https://github-readme-juejin-recent-article-flywith24.vercel.app/xiaozhuanlan/detail/7)](https://github-readme-juejin-recent-article-flywith24.vercel.app/xiaozhuanlan/detail/7)



# 项目链接

[项目链接](https://github.com/Flywith24/github-juejin-readme-rss)

欢迎各位 `star`，`fork`， `提 PR`

# 部署自己的服务

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/Flywith24/github-juejin-readme-rss)


# 参考

感谢这几个项目提供的思路

- [RSSHub](https://github.com/DIYgod/RSSHub)

- [github-readme-medium](https://github.com/omidnikrah/github-readme-medium)

- [github-readme-medium-recent-article](https://github.com/bxcodec/github-readme-medium-recent-article)
