# 设计师 工厂端

### 相应模块开发负责人

- `顾孝标`：All modules

### 相关文档

- [设计师平台项目 prd](https://wiki.xinc818.com/pages/viewpage.action?pageId=52874233)

- [交互稿/视觉稿](https://codesign.qq.com/app/design/2bzpZvJBaAZkAaV?team_id=eGyOl9ykrLZdxaW)

### 账号密码

| 环境  | 账号     | 密码       |
| ----- | -------- | ---------- |
| dev   | pgl      | Test123456 |
| daily | daxia123 | Test1234   |
| gray  |          |            |
| prod  |          |            |

### 访问地址

| 环境 | 地址 |
| --- | --- |
| dev | [https://jf-dev.xinxuan818.com/workshop/](https://jf-dev.xinxuan818.com/workshop/) |
| daily | [https://jf-daily.xinxuan818.com/workshop/](https://jf-daily.xinxuan818.com/workshop/) |
| gray | [https://jf-gray.xinxuan818.com/workshop/](https://jf-gray.xinxuan818.com/workshop/) |
| prod | [https://jf-prod.xinxuan818.com/workshop/](https://jf-prod.xinxuan818.com/workshop/) |

### 最简单的提交格式（注意冒号后面有空格）

```
    <type>: <subject>
```

type 是提交类型  
subject 是 commit 目的的简短描述

### 常用的 type 类别

### 主要 type

- feat: 增加新功能
- fix: 修复 bug

### 特殊 type

- docs: 只改动了文档相关的内容
- style: 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
- build: 构造工具的或者外部依赖的改动，例如 webpack，npm
- refactor: 代码重构时使用
- revert: 执行 git revert 打印的 message

- test: 添加测试或者修改现有测试
- perf: 提高性能的改动
- ci: 与 CI（持续集成服务）有关的改动
- chore: 不修改 src 或者 test 的其余修改，例如构建过程或辅助工具的变动

例子：

```
git commit -m 'feat: 增加 xxx 功能'
git commit -m 'bug: 修复 xxx 功能'
```
