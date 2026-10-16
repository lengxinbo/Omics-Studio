import {integrationTopics,integrationLessons,integrationSources} from './integration-data.js';
import {newTopics,lessons,foundationSources} from './foundations.js';
import {omicsTopics,omicsReferences} from './omics-data.js';
// Add a topic here and reference its id in a course. The classroom, search,
// knowledge map, quiz and local progress all consume the same content schema.
export const sources={cell:{label:'OpenStax · 真核细胞',url:'https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells'},gene:{label:'OpenStax · 基因与蛋白质',url:'https://openstax.org/books/biology-2e/pages/15-introduction'},regulation:{label:'OpenStax · 基因表达调控',url:'https://openstax.org/books/biology-2e/pages/16-introduction'},omics:{label:'EMBL-EBI · 多组学入门',url:'https://www.ebi.ac.uk/training/events/introduction-multiomics-data-integration-and-visualisation/'},genome:{label:'NHGRI · 遗传学术语',url:'https://www.genome.gov/genetics-glossary'}};
const t=(id,name,en,color,summary,points,question,options,answer,explanation,links,source='cell')=>({id,name,en,color,summary,points,question,options,answer,explanation,links,source});
export const topics=[
 t('membrane','细胞膜','Cell membrane','#a8b8b0','细胞膜把细胞内部与外界分隔开，并有选择地控制物质进出。它也是细胞接收外界信号的重要界面。',['主体是磷脂双分子层，嵌有多种蛋白质。','通道和转运蛋白帮助特定物质通过。','膜上的受体可接收信号，引发细胞内响应。'],'细胞膜允许所有物质自由通过吗？',['有选择地控制进出','所有物质都能自由通过'],0,'膜的脂质结构和膜蛋白共同决定哪些物质能够通过，以及如何通过。',['proteomics','signaling']),
 t('nucleus','细胞核','Nucleus','#a69bb8','细胞核储存真核细胞的大部分遗传信息。认识它，是理解基因、染色体与基因表达的起点。',['DNA 与蛋白质共同组成染色质。','核膜上的核孔参与细胞核与细胞质之间的物质交换。','转录主要在细胞核中发生；线粒体也有自己的 DNA。'],'典型动物细胞的大部分 DNA 位于哪里？',['细胞核','细胞膜'],0,'大部分 DNA 位于细胞核内，另有少量 DNA 在线粒体中。',['dna','genomics','epigenomics']),
 t('mitochondria','线粒体','Mitochondrion','#bc9991','线粒体参与把营养物质中的化学能转化为细胞可以利用的 ATP，并参与多种代谢过程。',['具有外膜和内膜，内膜折叠形成嵴。','氧化磷酸化发生在线粒体内膜上。','含有少量自己的 DNA，但多数线粒体蛋白由核基因编码。'],'线粒体内膜的折叠结构叫什么？',['嵴','核孔'],0,'嵴是线粒体内膜的折叠，增加了相关反应可利用的膜面积。',['metabolomics','protein']),
 t('ribosome','核糖体','Ribosome','#b5a98f','核糖体读取 mRNA 的信息，把氨基酸连接成多肽链。这一过程称为翻译。',['由核糖体 RNA 和蛋白质组成。','可游离于细胞质，也可附着在粗面内质网上。','核糖体没有膜包裹。'],'核糖体直接参与哪一个过程？',['翻译','DNA 复制'],0,'翻译时，核糖体按 mRNA 上的密码子顺序参与合成多肽链。',['translation','proteomics']),
 t('er','内质网','Endoplasmic reticulum','#99a7ba','内质网是细胞内相互连接的膜性结构。粗面内质网参与部分蛋白质的合成与加工，光面内质网参与脂质合成等过程。',['粗面内质网表面附着核糖体。','许多分泌蛋白和膜蛋白经内质网加工。','光面内质网还参与钙离子储存等活动。'],'粗面内质网的“粗面”主要来自什么？',['附着的核糖体','附着的染色体'],0,'附着的核糖体使粗面内质网在电镜下呈现颗粒状外观。',['ribosome','golgi']),
 t('golgi','高尔基体','Golgi apparatus','#c2b195','高尔基体进一步加工和分拣来自内质网的蛋白质与脂质，并将它们送往不同目的地。',['由多层扁平膜囊组成。','参与糖基化等修饰过程。','通过运输囊泡连接细胞内的物流路线。'],'分泌蛋白常见的运输顺序是？',['内质网 → 高尔基体 → 细胞外','高尔基体 → 细胞核 → 细胞外'],0,'许多分泌蛋白经内质网和高尔基体加工，随后通过囊泡运输并释放到细胞外。',['er','proteomics']),
 t('lysosome','溶酶体','Lysosome','#9fac9e','溶酶体含有多种降解酶，帮助细胞分解摄入的物质，并回收部分老旧的细胞组分。',['内部环境偏酸性，有利于相关酶发挥作用。','参与自噬过程中的物质降解。','分解产物可供细胞重新利用。'],'溶酶体主要参与什么？',['分解与回收','储存大部分遗传信息'],0,'溶酶体承担细胞内的分解与回收功能，大部分遗传信息储存在细胞核中。',['metabolomics','protein']),
 t('dna','DNA','Deoxyribonucleic acid','#a69bb8','DNA 是储存遗传信息的分子。碱基的排列顺序构成序列，序列中的一些区域承担基因的功能。',['DNA 通常由两条互补链组成双螺旋。','四种碱基为 A、T、C、G，通常 A 与 T 配对，C 与 G 配对。','基因可编码蛋白质，也可产生具有功能的 RNA。'],'DNA 中与 A 通常配对的碱基是？',['T','U'],0,'DNA 中 A 通常与 T 配对；RNA 使用 U，而不是 T。',['genomics','transcription'],'gene'),
 t('rna','RNA','Ribonucleic acid','#b8a58e','RNA 有多种类型与功能。mRNA 可携带合成蛋白质的信息，rRNA 和 tRNA 参与翻译，还有许多 RNA 参与调控。',['RNA 通常为单链，并可折叠形成局部结构。','RNA 的碱基包括 A、U、C、G。','转录组关注特定条件下样本中的 RNA 集合。'],'所有 RNA 都会被翻译为蛋白质吗？',['不会，许多 RNA 本身有功能','会，RNA 都是蛋白质模板'],0,'只有部分 RNA 是编码蛋白质的 mRNA；rRNA、tRNA 等具有其他功能。',['transcriptomics','translation'],'gene'),
 t('protein','蛋白质','Protein','#8fa5b1','蛋白质由氨基酸连接而成，并通过折叠形成结构。它们可以催化反应、传递信号、运输物质或支撑细胞。',['氨基酸序列影响蛋白质的结构与功能。','蛋白质的数量、修饰和定位都会影响功能。','RNA 水平变化不一定带来同等程度的蛋白质变化。'],'蛋白质的基本组成单位是什么？',['氨基酸','核苷酸'],0,'氨基酸通过肽键连接形成多肽；核苷酸则是 DNA 和 RNA 的组成单位。',['proteomics','metabolomics'],'gene'),
 t('metabolite','代谢物','Metabolite','#a8b49b','代谢物是代谢过程中产生、转化或消耗的小分子，例如葡萄糖、乳酸与多种氨基酸。',['代谢物连接物质转化与能量利用。','其含量受酶活性、营养和环境等因素影响。','代谢物浓度不等同于代谢通量。'],'代谢物浓度高，能直接证明相关反应速度快吗？',['不能，还要考虑生成与消耗','能，浓度就是反应速度'],0,'浓度反映生成、消耗和运输等过程的综合结果，通量描述单位时间的转化量。',['metabolomics','integration'],'omics'),
 t('transcription','转录','Transcription','#a69bb8','转录以 DNA 的一条链为模板合成 RNA。对于蛋白质编码基因，它是基因表达的重要环节。',['RNA 聚合酶参与 RNA 的合成。','真核细胞的前体 mRNA 通常还需加工。','同一基因在不同细胞或条件下可具有不同的转录水平。'],'转录直接产生什么？',['RNA','蛋白质'],0,'转录产生 RNA，翻译才按 mRNA 的信息合成多肽链。',['rna','transcriptomics'],'gene'),
 t('translation','翻译','Translation','#91a5b4','翻译把 mRNA 中的编码信息转变为氨基酸序列。核糖体和 tRNA 共同参与这一过程。',['核糖体按密码子读取 mRNA。','tRNA 将相应氨基酸带到核糖体。','新生多肽通常还需要折叠或进一步加工。'],'DNA → RNA → 蛋白质中，第二个箭头通常表示？',['翻译','转录'],0,'RNA 到多肽链的过程称为翻译。并非所有 RNA 都进入这条路径。',['ribosome','proteomics'],'gene'),
 t('regulation','基因调控','Gene regulation','#aaa0b9','不同细胞可以拥有相似的 DNA，却表达不同的基因。基因调控决定基因在何时、何处以及多大程度上发挥作用。',['调控可发生在转录、RNA 加工、翻译等多个层面。','染色质可及性影响部分调控因子接近 DNA。','调控关系需要实验支持，相关性本身不能证明因果。'],'拥有相似 DNA 的细胞，表达谱一定相同吗？',['不一定','一定相同'],0,'细胞类型和状态不同，基因表达调控也会不同。',['epigenomics','transcriptomics'],'regulation'),
 t('signaling','细胞信号','Cell signaling','#a5b7b0','细胞通过接收并传递信号来响应环境。信号可影响蛋白质活性、代谢和基因表达。',['受体识别信号分子。','细胞内信号常通过蛋白质相互作用和修饰传递。','同一种信号在不同细胞背景下可能产生不同响应。'],'磷酸化变化一定需要 RNA 数量先改变吗？',['不一定','一定需要'],0,'蛋白质修饰可快速改变活性，而不必先改变 RNA 数量。',['proteomics','integration'],'regulation'),
 t('genomics','基因组学','Genomics','#a69bb8','基因组学研究基因组的序列、结构与变异。它帮助我们了解遗传信息是什么，以及样本之间存在哪些差异。',['研究对象：DNA。','常见方法：全基因组测序、外显子组测序。','常见结果：序列变异、拷贝数变化等。'],'哪种组学主要研究 DNA 序列变异？',['基因组学','代谢组学'],0,'DNA 序列变异属于基因组学的研究内容。',['dna','epigenomics'],'genome'),
 t('epigenomics','表观基因组学','Epigenomics','#b5a0b1','表观基因组学在基因组范围研究 DNA 甲基化、组蛋白修饰和染色质状态等特征，帮助理解基因调控背景。',['ATAC-seq 反映染色质可及性。','不同实验测量的是不同层面的特征。','可及性高不等于对应基因一定高表达。'],'ATAC-seq 主要反映什么？',['染色质可及性','蛋白质绝对含量'],0,'ATAC-seq 用于评估染色质可及性，可结合 RNA 等数据研究调控。',['regulation','transcriptomics'],'omics'),
 t('transcriptomics','转录组学','Transcriptomics','#baa98e','转录组学研究特定条件下样本中的 RNA，帮助我们了解哪些基因正在表达、表达水平如何变化。',['常见方法：RNA-seq。','常见数据：基因 × 样本的计数矩阵。','比较样本前需要考虑测序深度、组成差异与批次。'],'RNA-seq 的表达矩阵通常包含什么？',['基因在各样本中的 RNA 计数','每个蛋白质的三维坐标'],0,'常见输入为基因计数矩阵；这些数值需要恰当处理后再进行比较。',['rna','singlecell','replicates'],'omics'),
 t('proteomics','蛋白质组学','Proteomics','#92a6b2','蛋白质组学研究蛋白质的组成、丰度与修饰等特征，更接近许多细胞功能的执行层。',['常见技术：质谱。','研究内容可包括磷酸化等翻译后修饰。','蛋白质丰度与活性不是同一个概念。'],'RNA 增加，蛋白质一定同比例增加吗？',['不一定','一定会'],0,'翻译效率、蛋白质降解等因素都会影响蛋白质水平。',['protein','signaling','integration'],'omics'),
 t('metabolomics','代谢组学','Metabolomics','#a2b29b','代谢组学研究样本中的小分子代谢物，帮助理解细胞或组织的代谢状态。',['常见技术：质谱和核磁共振。','可采用靶向或非靶向策略。','饮食、采样时间与样本处理均可能影响结果。'],'代谢组学主要研究哪一类对象？',['小分子代谢物','染色体的三维结构'],0,'葡萄糖、乳酸和多种脂质等小分子是代谢组学关注的对象。',['metabolite','mitochondria','integration'],'omics'),
 t('replicates','样本与重复','Samples & replicates','#9eacae','读图之前，先弄清每一个数据点代表什么。独立生物学样本与同一样本的重复测量提供不同的信息。',['生物学重复用于评估生物学变异。','技术重复评估测量过程的变异。','一位供者的许多细胞，不能直接当作许多独立供者。'],'同一样本测量三次，等于三个独立生物学样本吗？',['不等于','等于'],0,'这属于技术重复，不能替代独立生物学样本。',['singlecell','volcano'],'omics'),
 t('volcano','火山图','Volcano plot','#b4a09c','火山图同时展示变化幅度和统计显著性。先看坐标含义，再结合实验设计、效应量与多重检验理解结果。',['横轴常为 log₂ 倍数变化。','纵轴常为 −log₁₀ P 值或校正后的 P 值；须查看图注。','显著性不等于生物学重要性，也不证明因果。'],'火山图中，离横轴原点越远通常意味着什么？',['变化幅度越大','样本数量越多'],0,'在横轴为 log₂ 倍数变化时，绝对值越大表示倍数变化幅度越大。',['replicates','transcriptomics'],'omics'),
 t('singlecell','单细胞组学','Single-cell omics','#9baba9','单细胞技术把观察单位细化到单个细胞，帮助发现细胞类型和状态差异。常见的单细胞 RNA 测序测量每个细胞的转录信息。',['聚类需要结合标记基因与背景知识解释。','UMAP 等图中的距离不能直接解释为发育时间。','细胞数量与独立供者数量都需要关注。'],'UMAP 上相邻的细胞一定有直接谱系关系吗？',['不一定','一定有'],0,'降维图表达高维特征的部分结构，不能单凭距离推断谱系或因果关系。',['transcriptomics','spatial','replicates'],'omics'),
 t('spatial','空间组学','Spatial omics','#aaa0b4','空间组学把分子测量与组织位置联系起来，帮助我们理解不同细胞和微环境的空间组织。',['空间分辨率随技术而变化。','一个测量点可能包含多个细胞。','空间邻近可以提供线索，但不直接证明细胞通信。'],'一个空间测量点一定只包含一个细胞吗？',['不一定，取决于技术与分辨率','一定只包含一个'],0,'不同平台的测量单位不同，有些测量点会覆盖多个细胞。',['singlecell','integration'],'omics'),
 t('integration','多组学整合','Multi-omics integration','#9fa9b4','把同一生物学问题的不同分子层次联系起来，形成更完整的解释。例如同时观察调控状态、RNA 和蛋白质变化。',['先明确问题，再选择互补的组学。','确认样本、时间点和细胞背景是否可比。','跨组学关联提供假设，机制解释还需要验证。'],'两类组学的变化相关，能直接证明因果吗？',['不能','能'],0,'相关关系可能受共同调控、细胞组成或批次等因素影响，需要进一步验证。',['epigenomics','transcriptomics','proteomics'],'omics'),
 t('case','从问题到证据','From question to evidence','#9baeb2','为什么某个基因的 RNA 增加，而对应蛋白质变化不明显？这个问题可以串联转录、翻译与降解等多个层面。',['先确认样本与测量时间是否匹配。','再考虑翻译效率、蛋白质稳定性与测量覆盖。','设计后续实验，区分不同解释。'],'面对 RNA 与蛋白质不一致，第一步更合理的是？',['核对样本、时间与测量条件','立即认定其中一种技术错误'],0,'先确认数据可比性，再提出并检验生物学解释。',['rna','protein','integration'],'omics')
];
topics.push(...newTopics);
topics.push(...integrationTopics);
for(const l of integrationLessons){const topic=topics.find(t=>t.id===l.id);Object.assign(topic,{name:l.name,en:l.en,integration:l,summary:l.summary,points:l.points,source:l.source});}
Object.assign(sources,integrationSources);
for(const incoming of omicsTopics){const old=topics.find(t=>t.id===incoming.id);if(old){Object.assign(old,{summary:incoming.summary,points:incoming.points,links:incoming.links,omics:incoming.omics,source:incoming.source});}else topics.push(incoming);}
for(const [id,ref] of Object.entries(omicsReferences))sources['atlas-'+id]=ref;
Object.assign(sources,foundationSources);
for(const item of topics){if(lessons[item.id])item.lesson=lessons[item.id];}
export const byId=Object.fromEntries(topics.map(x=>[x.id,x]));
export const courses=[
 {id:'cell',name:'认识细胞',en:'THE CELL',title:'从一个细胞开始',subtitle:'认识一个结构，看懂一个过程，再用练习确认理解。',icon:'cell',kind:'cell',minutes:55,topics:['cell-basics','membrane','cytoplasm','nucleus','mitochondria','ribosome','er','golgi','lysosome']},
 {id:'molecules',name:'DNA、RNA 与蛋白质',en:'MOLECULES OF LIFE',title:'认识生命的分子',subtitle:'从组成单位到功能分子，一步步建立自己的知识地图。',icon:'dna',kind:'molecule',minutes:45,topics:['nucleotide','dna','gene-chromosome','rna','protein','enzyme','metabolite']},
 {id:'expression',name:'基因如何表达',en:'FROM CODE TO FUNCTION',title:'让遗传信息开始工作',subtitle:'跟着复制、转录、剪接与翻译，理解信息如何被保存和使用。',icon:'process',kind:'molecule',minutes:50,topics:['replication','transcription','rna-processing','translation','regulation','signaling']},
 {id:'omics',name:'认识组学 · 全景图谱',en:'THE OMICS ATLAS',title:'走进组学的全景世界',subtitle:'从研究对象到测量方法，用模型与实验台理解每一种视角。',icon:'layers',kind:'cards',minutes:180,topics:omicsTopics.map(t=>t.id)},
 {id:'data',name:'读图、单细胞与空间',en:'LEARN TO READ THE DATA',title:'从一个数据点读懂结果',subtitle:'先理解样本与坐标，再走向单细胞和空间信息。',icon:'chart',kind:'data',minutes:20,topics:['replicates','volcano','singlecell','spatial']},
 {id:'integration',name:'多组学整合 · 案例课堂',en:'CONNECT THE EVIDENCE',title:'把不同层次的证据连接起来',subtitle:'四个研究案例，七种动手实验，从样本配对走到可验证的解释。',icon:'network',kind:'cards',minutes:100,topics:integrationLessons.map(l=>l.id)}
];
export const processes={
 cell:[{title:'从细胞核读取信息',text:'细胞核中的 DNA 为 RNA 合成提供模板。先选中细胞核，认识信息的起点。',topic:'nucleus'},{title:'核糖体合成多肽',text:'部分 RNA 作为 mRNA 被核糖体读取，氨基酸逐步连接为多肽链。',topic:'ribosome'},{title:'内质网参与加工',text:'许多分泌蛋白和膜蛋白在粗面内质网相关区域合成，并进入加工与运输路线。',topic:'er'},{title:'高尔基体分拣运输',text:'高尔基体进一步加工和分拣这些蛋白质，再由囊泡运输到相应位置。',topic:'golgi'}],
 molecular:[{title:'DNA：储存信息',text:'DNA 的碱基序列携带遗传信息。蛋白质编码基因只是基因的一类。',topic:'dna'},{title:'转录：从 DNA 到 RNA',text:'RNA 聚合酶以 DNA 为模板合成 RNA。真核前体 mRNA 通常还要经过加工。',topic:'rna'},{title:'翻译：从 mRNA 到多肽',text:'核糖体读取 mRNA，tRNA 带来氨基酸。多肽进一步折叠，形成蛋白质结构。',topic:'protein'}]
};
