# Omics Studio · 多组学学习室

从细胞三维探索出发，连接分子生物学与多组学知识的中文学习网站。

- 网站：https://omics-studio-learning.coralstar3.chatgpt.site （当前为私人访问）
- GitHub：https://github.com/lengxinbo/Omics-Studio
- 后续项目更新同步到本仓库，协作规则见 [AGENTS.md](AGENTS.md)。

## 本地运行

在本目录运行 `node server.mjs`，打开 http://127.0.0.1:4173 。项目依赖已随站点保存，无需安装 npm 包。三维显示需要支持 WebGL 的现代浏览器。

## 已实现

- 低饱和度动物细胞剖面：拖动旋转、滚轮和双指缩放、按钮缩放、自动旋转、复位、三维网格拾取。
- 85 个知识点，分为 6 个学习阶段；前三章 22 个入门知识点各含目标、类比、分段讲解、实例、易混点与中英术语。
- DNA、RNA、蛋白质与小分子教学模型；9 个可暂停、逐步查看、拖动时间轴和调速的过程动画。
- 知识地图、中英术语搜索、272 道练习（入门部分 66 道）、提示与解析、按章筛选、错题与收藏、引导学习。
- 笔记编辑、删除、Markdown 导出；浏览器本地保存学习状态。
- 火山图阈值操作、单细胞和空间数据教学示意。
- 桌面与手机布局、键盘操作、WebGL 不可用时的文字学习入口。

## 组学全景图谱

“认识组学”覆盖 46 个常见及交叉研究方向，分为六个导航区域。既包含核心分子层次，也包含修饰分支、群落研究和单细胞／空间等研究视角；各方向存在交叉，这是一份可扩展的学习图谱。

每个方向包括基础说明、三个研究问题、代表性技术的原理与输出、适用场景、技术取舍、研究实例、解释边界与方法来源。可以选择同方向或跨方向技术，在统一表格中比较。

46 个方向分别建立可旋转、缩放、点选与分部观察的三维场景，展示相应的采样对象、测量单位和输出。例如 RNA、RNA 修饰与核糖体足迹使用不同场景；糖组展示释放糖链，糖蛋白组展示位点与糖肽。场景是程序化教学示意。

新增肿瘤基因组、转录本与剪接、小 RNA、单细胞 ATAC、免疫受体库和单细胞多模态。每个方向包含输入文件、四步分析路线、结果类型、三项质控重点、易混技术比较与官方方法资料。20 个常用方向额外提供 80 段步骤解释，并附文件与统计术语入门。生信实验台提供 22 种可计算交互，第三个标签切换到当前方向的分析演示；原有 8 类技术原理演示继续保留。04 章共 138 道练习，覆盖基础、数据单位与结果解释。所有演示数据均为教学构造。

## 如何扩展

`dist/js/content.js` 保存课程和知识点，是扩展教学内容的入口。

1. 在 `topics` 增加知识点，填写稳定且唯一的 `id`、中英名称、概要、三个要点、题目、选项、正确答案索引、解析、关联知识点及来源。
2. 把新知识点的 id 加入对应 `courses[].topics`。搜索、知识地图、练习和学习进度会自动读取它。
3. 在 `sources` 增加可追溯的来源，给知识点设置来源键。
4. 增加三维对象时，在 `dist/js/model.js` 注册可拾取网格与知识点 id。可继续扩展模型生成函数，或接入有清晰授权的 GLB 模型。
5. 新的图表和课堂交互在 `dist/js/app.js` 增加；页面样式在 `dist/style.css`。

入门课程详解、新知识点与新增练习位于 `dist/js/foundations.js`；`dist/js/exercises.js` 生成题库、统计结果并迁移旧答题记录。每道练习使用稳定的“知识点:题目”id，新增题目不覆盖旧答案。

`dist/js/animations.js` 保存 9 个 SVG 过程演示与统一播放器：膜运输、分泌路线、ATP 合成、DNA 复制、转录、RNA 剪接、翻译、酶催化、信号传递。增加动画时同时定义所属章节、相关知识点、四步说明及绘图逻辑。

组学条目、技术字段和来源位于 `dist/js/omics-data.js`；`dist/js/omics-ui.js` 负责图谱、对比与技术实验台，`dist/js/omics-model.js` 负责三维模型，`dist/omics.css` 保存对应布局。保留已有五大组学的测验选项和答案，避免改变旧记录含义。

知识点 id 也是学习记录的键。迭代内容时保持已有 id，可保留用户的笔记、收藏和进度。持久化结构使用版本键 `omics-studio-v1`，结构变更时应添加迁移逻辑。

## 科学表达与模型范围

模型由本项目程序化生成，是帮助识别结构的教学示意，不是显微成像重建或等比例分子结构。细胞模型使用剖面暴露内部结构，RNA 和蛋白质展示一般形态；未表示特定序列或已解析蛋白质。方法实验台与基础读图图表使用教学模拟并明确标注。课程使用原创中文说明，并提供继续阅读的教材或研究机构链接。

## 数据保存

笔记、收藏、测验和学习进度保存在当前浏览器的 localStorage，不自动跨设备同步。清除站点数据会清除本地记录。可以在“我的笔记”导出 Markdown 备份。后续可增加账户和云端同步，而不改变课程数据结构。

## 验证

`npm run check` 检查应用语法与课程数据完整性、稳定题目 id、旧记录迁移。

`tests/course-verification.json` 与 `tests/course-*.png`、`tests/translation-desktop.png`、`tests/lesson-reader-desktop.png` 记录课程更新的浏览器检查。启动本地服务后运行 `node tests/browser-courses.mjs` 可检查答题、章节筛选、动画播放与时间轴、三维拾取与旋转缩放、390px 手机宽度。浏览器检查使用 Playwright，可通过 `PLAYWRIGHT_MODULE_ROOT` 和 `BROWSER_PATH` 指定本机已有依赖和浏览器。原始验证保留在 `tests/verification.json`。发布时静态目录为 `dist/`，源文件与截图可独立保存。

组学模块验证：`node tests/omics.test.mjs` 检查分类、技术数据和旧测验兼容；本地服务运行时，`node tests/browser-omics.mjs` 验证全部方向、三维实际拾取、对比、模拟和手机宽度。截图及结果见 `tests/omics-*.png` 与 `tests/omics-verification.json`。

## 依赖与参考

- Three.js 0.170.0 与 OrbitControls，MIT 许可证保存在 `dist/vendor/THREE-LICENSE.txt`。
- 界面方向参考 https://github.com/cclank/cell-architecture-studio ，本项目三维几何与应用代码独立编写。
- 内容延伸阅读链接位于 `dist/js/content.js`。本项目未复制参考仓库的模型文件或教材插图。

## 多组学整合案例课堂（1.3.0）

新增 8 个学习单元、四个研究案例和 40 个推演步骤；本章共 32 道练习，当时全站共 74 个知识点与 142 道练习。案例背景为乳腺癌蛋白基因组、SHARE-seq、CITE-seq 与 IBD 纵向多组学，原始论文与官方方法文档可从课堂打开。全部数值为原创教学模拟，不是论文数据复现。

七种交互实验覆盖样本对齐、批次混杂、RNA / 蛋白响应延迟、细胞类型造成的总体相关、模态权重、相对丰度分母效应和供者级验证划分。方法选择页比较特征拼接、MOFA+、DIABLO、WNN 与后期证据汇合；实验台不执行这些真实整合工具。

课程与题目在 `dist/js/integration-data.js`；可验证计算在 `integration-lab.js`；推演播放器、交互与详解在 `integration-ui.js`；样式在 `dist/integration.css`。旧 `integration`、`case` 的入门题及学习记录键保持兼容。新增案例沿用统一题库、错题、搜索、收藏与笔记。

运行 `node tests/integration.test.mjs` 检查课程与计算，启动网站后运行 `node tests/browser-integration.mjs` 检查七种实验、步骤播放与暂停、方法对比、旧记录与新作答保存、检索、手机布局和退出清理。检查结果及截图位于 `tests/integration-*`。

## 读图、单细胞与空间课堂（1.4.0）

本章扩展为 9 个学习单元、36 道练习和 9 类交互图表；当时全站 79 个知识点、174 道练习。三个场景串联处理前后表达、PBMC 免疫细胞与组织空间位置，覆盖独立重复、火山图、箱线 / 小提琴图、热图、PCA、UMAP 形态示意、标记气泡图、空间表达图和经典富集曲线。每课包含四步引导、可点击图表、对应数据表、计算范围、参考资料和逐项答案解析。

课程与题目在 `dist/js/reading-data.js`，可复核的计算在 `reading-lab.js`，交互与阅读器在 `reading-ui.js`，样式在 `dist/reading.css`。原有 `replicates`、`volcano`、`singlecell`、`spatial` 的入门题语义与记录键保持不变。

所有图形和数值都是原创教学模拟。二维 PCA 在浏览器内由两个中心化特征计算；UMAP 坐标与候选细胞标签为手工设定。火山图 padj 为预设值；小提琴使用固定带宽的核密度示意；空间聚合为算术平均；富集实验计算经典未加权 ES，未计算 NES、P 值或 FDR。界面明确标注这些范围，不作为真实数据分析工具。

运行 `node tests/reading.test.mjs` 检查计算和兼容性；启动预览后运行 `node tests/browser-reading.mjs` 检查图表控件、点选与键盘选择、自动讲解、记录保存、检索、移动布局和离开页面后的播放器清理。结果及截图保存为 `tests/reading-*`。


## 04 生信扩展与模型重建（1.6.0）

取消真实论文章节与原图资源，旧的该章节最后阅读位置迁移到认识组学。现有六章共 85 个知识点、272 道练习；其余章节知识点与已有题目 id 保持稳定。

新增方向和方法来源在 `omics-expansion.js`，独立场景在 `omics-scenes.js`，46 条分析路线在 `omics-analysis-data.js`，20 个高频方向详解在 `omics-workflow-lessons.js`，解释题在 `omics-case-questions.js`。22 种交互计算在 `omics-analysis-lab.js`，界面在 `omics-analysis-ui.js`。这些文件位于 `dist/js/`；布局在 `dist/omics-analysis.css`。

`tests/omics-analysis.test.mjs` 复核数据单位、归一化、配对、比例与过滤等计算；`tests/browser-analysis.mjs` 检查 46 个场景、分析流程和移动端布局。
