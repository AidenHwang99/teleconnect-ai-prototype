# 同事如何查看、下载和推送更新

仓库：https://github.com/AidenHwang99/teleconnect-ai-prototype

在线预览：https://aidenhwang99.github.io/teleconnect-ai-prototype/

## 1. 无需加入协作者：Fork → 推送自己仓库 → Pull Request

任何同事都可以查看公开仓库、下载ZIP、在自己的GitHub账号Fork后提交修改。**不添加协作者无法直接写入原仓库**，但可以通过Pull Request把更新交给维护人审核合并。

1. 登录自己的GitHub账号，打开仓库，点击右上角 **Fork**。
2. 在自己的Fork页面复制克隆地址并执行以下命令。把`YOUR_GITHUB_NAME`换成自己的用户名。

```sh
git clone https://github.com/YOUR_GITHUB_NAME/teleconnect-ai-prototype.git
cd teleconnect-ai-prototype
git remote add upstream https://github.com/AidenHwang99/teleconnect-ai-prototype.git
git switch -c update/my-prototype-change
npm ci
```

3. 修改`.prototype152/`中对应JS/CSS模块；修改相关TMD说明。152源模块加载顺序见build.py；不要删除原142功能。
4. 重新生成并验证：

```sh
npm run build
npm test
npm run verify
python3 -m http.server 8147
```

5. 用浏览器打开 `http://127.0.0.1:8147/docs/prototype.html`，至少检查改动入口、任务详情、角色权限、未读联动、页面返回和未保存编辑保护。
6. 查看变更并提交推送到**自己的Fork**：

```sh
git status
git diff --stat
git add .prototype152 teleConnect_AI主动模式原型_152.html teleConnect_152_TMD_142之后全部更新.md docs
git commit -m "Improve prototype interaction"
git push -u origin update/my-prototype-change
```

如同时新增构建脚本/文档，按实际内容添加相应路径。不要添加node_modules、账号凭据或缓存。

7. GitHub页面点击 **Contribute → Open pull request**，目标选择`AidenHwang99/teleconnect-ai-prototype`的`main`，说明问题、修改内容、验证步骤，附截图。
8. 维护人检查后合并。只有合并到原仓库main后，原仓库在线预览才更新；Fork内的推送不会直接替换线上版本。

后续同步维护人的更新：

```sh
git fetch upstream
git switch main
git merge --ff-only upstream/main
git push origin main
git switch -c update/next-change
```

如果本地main含独有提交导致不能快进，请使用新功能分支或处理冲突，不要强推覆盖原仓库历史。

## 2. 已被添加为协作者

获得仓库写入权限后可直接克隆原仓库，在自己的功能分支推送并发起PR：

```sh
git clone https://github.com/AidenHwang99/teleconnect-ai-prototype.git
cd teleconnect-ai-prototype
git switch -c update/your-change
# 修改、构建、测试后提交
git push -u origin update/your-change
```

建议仍通过PR检查后合并main；无需共享维护人的密码或Token。当前没有替维护人添加任何同事权限。

## 3. 只下载/查看

- 页面打开无需GitHub写入权限。
- 首页“下载152 HTML”得到单文件；“下载全部源码ZIP”得到源模块、文档和历史版本。
- 当前TMD为开发依据，旧MD及历史归档用于了解演进，不能覆盖当前规则。

## 4. 发布与版本规则

- 当前由GitHub Pages从main的`/docs`发布；页面生成由提交者在本地运行`npm run build`完成。
- `npm run verify`检查源码HTML、发布HTML、MD和固定版本清单一致。省略构建可能导致源码已改、在线页面未改。
- 推送main后，到仓库 **Actions → pages build and deployment** 查看部署；随后打开在线页面刷新验收。不同浏览器有独立的本地已读和演示状态。
- 新版本例如152须保留152固定版，新增版本源码/HTML并更新脚本、manifest及首页当前入口；不要用“最新版本”覆盖历史文件。
- 紧急回退优先 `git revert <commit>` 后正常推送，或回退到已验收产物；不要重写共享历史。

参考：[GitHub Pages发布源设置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[从Fork提交Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)。
