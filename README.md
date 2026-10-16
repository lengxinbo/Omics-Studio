# Omics Studio · 多组学学习室

从细胞三维探索出发，连接分子生物学与多组学知识的中文学习网站。

- 网站：https://omics-studio-learning.coralstar3.chatgpt.site （当前为私人访问）
- GitHub：https://github.com/lengxinbo/Omics-Studio
- 后续项目更新同步到本仓库，协作规则见 [AGENTS.md](AGENTS.md)。

## 本地运行

在本目录运行 `node server.mjs`，打开 http://127.0.0.1:4173 。项目依赖已随站点保存，无需安装 npm 包。三维显示需要支持 WebGL 的现代浏览器。

## 已实现

- 低饱和度动物细胞剖面：拖动旋转、滚轮和双指缩放、按钮缩放、自动旋转、复位、三维网格拾取。
- 33 个知识点，分为 6 个学习阶段；前三章 22 个入门知识点各含目标、类比、分段讲解、实例、易混点与中英术语。
- DNA、RNA、蛋白质与小分子教学模型；9 个可暂停、逐步查看、拖动时间轴和调速的过程动画。
- 知识地图、中英术语搜索、77 道练习（入门部分 66 道）、提示与解析、按章筛选、错题与收藏、引导学习。
- 笔记编辑、删除、Markdown 导出；浏览器本地保存学习状态。
- 火山图阈值操作、单细胞和空间数据教学示意。
- 桌面与手机布局、键盘操作、WebGL 不可用时的文字学习入口。

## 如何扩展

`dist/js/content.js` 保存课程和知识点，是扩展教学内容的入口。

1. 在 `topics` 增加知识点，填写稳定且唯一的 `id`、中英名称、概要、三个要点、题目、选项、正确答案索引、解析、关联知识点及来源。
2. 把新知识点的 id 加入对应 `courses[].topics`。搜索、知识地图、练习和学习进度会自动读取它。
3. 在 `sources` 增加可追溯的来源，给知识点设置来源键。
4. 增加三维对象时，在 `dist/js/model.js` 注册可拾取网格与知识点 id。可继续扩展模型生成函数，或接入有清晰授权的 GLB 模型。
5. 新的图表和课堂交互在 `dist/js/app.js` 增加；页面样式在 `dist/style.css`。

入门课程详解、新知识点与新增练习位于 `dist/js/foundations.js`；`dist/js/exercises.js` 生成题库、统计结果并迁移旧答题记录。每道练习使用稳定的“知识点:题目”id，新增题目不覆盖旧答案。

`dist/js/animations.js` 保存 9 个 SVG 过程演示与统一播放器：膜运输、分泌路线、ATP 合成、DNA 复制、转录、RNA 剪接、翻译、酶催化、信号传递。增加动画时同时定义所属章节、相关知识点、四步说明及绘图逻辑。

知识点 id 也是学习记录的键。迭代内容时保持已有 id，可保留用户的笔记、收藏和进度。持久化结构使用版本键 `omics-studio-v1`，结构变更时应添加迁移逻辑。

## 科学表达与模型范围

模型由本项目程序化生成，是帮助识别结构的教学示意，不是显微成像重建或等比例分子结构。细胞模型使用剖面暴露内部结构，RNA 和蛋白质展示一般形态；未表示特定序列或已解析蛋白质。图表数值为教学模拟，在界面明确标注。课程使用原创中文说明，并提供继续阅读的教材或研究机构链接。

## 数据保存

笔记、收藏、测验和学习进度保存在当前浏览器的 localStorage，不自动跨设备同步。清除站点数据会清除本地记录。可以在“我的笔记”导出 Markdown 备份。后续可增加账户和云端同步，而不改变课程数据结构。

## 验证

`npm run check` 检查应用语法与课程数据完整性、稳定题目 id、旧记录迁移。

`tests/course-verification.json` 与 `tests/course-*.png`、`tests/translation-desktop.png`、`tests/lesson-reader-desktop.png` 记录课程更新的浏览器检查。启动本地服务后运行 `node tests/browser-courses.mjs` 可检查答题、章节筛选、动画播放与时间轴、三维拾取与旋转缩放、390px 手机宽度。浏览器检查使用 Playwright，可通过 `PLAYWRIGHT_MODULE_ROOT` 和 `BROWSER_PATH` 指定本机已有依赖和浏览器。原始验证保留在 `tests/verification.json`。发布时静态目录为 `dist/`，源文件与截图可独立保存。

## 依赖与参考

- Three.js 0.170.0 与 OrbitControls，MIT 许可证保存在 `dist/vendor/THREE-LICENSE.txt`。
- 界面方向参考 https://github.com/cclank/cell-architecture-studio ，本项目三维几何与应用代码独立编写。
- 内容延伸阅读链接位于 `dist/js/content.js`。本项目未复制参考仓库的模型文件或教材插图。
