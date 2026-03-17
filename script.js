// 全局变量
let currentQuestionIndex = 0;
let userAnswers = {};
let questions = [];

// 解析数据
const explanations = {
    1: "答案：D。解析：题干的图形均是由都由三种不同的小图形组成。",
    2: "答案：C。解析：第1个图形左右翻转得到第2个图形，第2个图形上下翻转后得到第3个图形。",
    3: "答案：D。解析：题干的第一组三个图形都是由4条直线和8条曲线构成的，第二组三个图形主体部分都具有5个空白部分。",
    4: "答案：A。解析：题干图形中，所有小正方形都没有公共边。",
    5: "答案：B。解析：直线数依次是1、2、3、4、5、6、7、8、（9），选项中只有B直线数为9。",
    6: "答案：D。解析：考虑封闭区域数。每行图形的封闭区域数之和分别为8、11、（14），是公差为3的等差数列，选择D。",
    7: "答案：C。解析：C中上面是题图从左至右第二个长方形，正面是题图从左至右第三个长方形，右侧面是题图最上面的长方形。",
    8: "答案：A。解析：观察题图可知，不会有两个相邻的面都为黑色，故B、C、D都不正确。",
    9: "答案：D。解析：每个三角形中，第二行数字分别等于它下面两个数字之和，最上面数字等于第二行数字之和减1，选项中只有D符合这些规律。",
    10: "答案：A。解析：从第一个图形开始，每次移动一根火柴得到下一个图形，选项中只有A可由题干第四个图形移动一根火柴得到。",
    11: "答案：C。解析：第一组图形每次旋转90度，白色部分覆盖在阴影上面，得到下一个图形；第二组图形中的大圆不动，小白圆依次顺时针旋转45度，且小白圆覆盖在大圆上，得到下一个图形。",
    12: "答案：B。解析：题干图形中，外围的黑色和白色小方格每次都围绕中间黑色方块顺时针移动一格，得到下一个图形。",
    13: "答案：D。解析：每组图形中，斜线的方向都相同，且图形形状都不同。",
    14: "答案：D。解析：第一组图形中，不同图形间的交点个数依次为2、4、6。第二组图形中不同图形间的交点个数也依次为2、4、（6），选择D项。",
    15: "答案：B。解析：第二、三个图形都是第一个图形的展开图。",
    16: "答案：B。解析：运用排除法，根据题图，折叠以后图形应该是凸起，而不是凹陷，排除A；C项的突起部分的长度与原图不符，排除C；在题图中凸起的面只有两个，排除D，所以选择B。",
    17: "答案：C。解析：第一组图形中字母都由三条直线组成，第二组图形中字母都是由四条直线组成，所以应选择C项。",
    18: "答案：A。解析：图示图形中空白部分面积小于黑色部分面积，所以选择A。",
    19: "答案：C。解析：图形种类数依次是1、2、3、4、5、（6），故选择C。",
    20: "答案：C。解析：第一个图形中的黑色三角形按顺时针方向依次移动2、3、4、（5）格，中间的三角形为白色、黑色间隔变化，故选择C。",
    21: "答案：D。解析：只有D项可以由左边的图形拼合而成。",
    22: "答案：B。解析：每组前两个图形叠加，去同存异得到第三个图形。",
    23: "答案：D。解析：两组图形结构上具有相似性，第一个图形都有'圆'，第二个图形都有'角'，第三个图形既有'圆'又有'角'。",
    24: "答案：C。解析：每组前两个图形叠加，去同存异得到第三个图形。",
    25: "答案：C。解析：题干图形的线段数都是8，选项中只有C项的线段数是8，选C。",
    26: "答案：C。解析：内部图形依次顺时针旋转90°，并依次向右移动。",
    27: "答案：A。解析：每项图形由左右两部分组成，前项图形的右部分图形是后项图形的左部分。",
    28: "答案：C。解析：后两个图形组合形成第一个图形。",
    29: "答案：A。解析：每个小方块依次顺时针方向移动一格得到下一个图形，符合该规律的只有A。",
    30: "答案：C。解析：第1、3个图形关于第2个图形对称。",
    31: "答案：A。解析：每个图形分别有4、5、6、7、8个封闭区域，所以后面一个图形应该有9个封闭区域，答案是A。",
    32: "答案：C。解析：从第一个图形开始，每个图形分别由1、2、3、4、5部分组成，所以后面的图形应该是由6部分组成的，所以答案是C。",
    33: "答案：D。解析：每个图形都是由两个不相同的部分组成的，所以答案是D。",
    34: "答案：C。解析：每个图形都是由三部分组成的，所以答案是C。",
    35: "答案：B。解析：奇数项为开放图形，偶数项为封闭图形，所以答案是B。",
    36: "答案：A。解析：第一组图形具有'I'的个数分别有1、2、3个，第二组图形的笔画数分别有1、2、3画。",
    37: "答案：D。解析：每个图形均由4条线段构成，而选项中只有D项符合条件。",
    38: "答案：D。解析：从行来看，每行三个图形前两个相加得到第三个图形，同为断开的线条或同为不断开的线条，相加后都得到不断开的线条，否则得到断开的线条。因此答案选D。",
    39: "答案：C。解析：题干4个字的笔画数依次为4、5、6、7、（8），选项中只有C项的笔画数为8，故选C。",
    40: "答案：D。解析：A项，顶部应为带黑点的线段，排除；B项，顶部应为带黑点的线段，排除；C项，三个箭头不会都相邻排除，故选D。",
    41: "答案：C。解析：每组第一个图形中的小图形个数乘以第二个图形中小图形的个数等于第三个图形中小图形的个数，所以问号处应填1×6=6个图形组成的图，只有C符合。",
    42: "答案：A。解析：从每行来看，'头发'的三种状态各出现一次，排除B、C。'嘴巴'的三种状态也是各出现一次，问号处应为'圆形的嘴巴'，故选A。",
    43: "答案：D。解析：从每行来看，方形的三种分割方式各出现一次，小图形各出现一次，由此可确定答案为D。",
    44: "答案：C。解析：图形被两条对角线分成了四部分，位置相对的两个字符，一组中心对称，另一组相互左右翻转可以得到。并且中心对称的图形所在区域的黑圆对应为白圆，排除B，选择C。",
    45: "答案：C。解析：每个字都有共同的一笔划'フ'，只有'登'字有这个笔划。",
    46: "答案：B。解析：图形直线数依次是10、8、6、4、（2），所以应选择直线数为2的图形。",
    47: "答案：C。解析：第一组图中各图形由形状相同的3个图形套放而成，最外层和最里层的图形朝向一致，中间层的套放方向与它们不同；第二组图中各图形也由形状相同的3个图形套放而成，中间层和最外层朝向一致，最里层图形朝向不同。",
    48: "答案：D。解析：两组各图形阴影斜线方向分别相同。",
    49: "答案：D。解析：第一组图形的第一个图形的左侧部分向右折叠得到第二个图形，折叠部分再向右平移得到第三个图形。第二组图形的第一个图形的右侧部分向左折叠得到第二个图形，折叠部分再向左平移得到第三个图形。",
    50: "答案：A。解析：第一列图形都有水平对称轴；第二列图形都有竖直对称轴；第三列图形既有水平对称轴又有竖直对称轴。",
    51: "答案：C。解析：每行前两个图形叠加，去同存异，得到第三个图形。",
    52: "答案：D。解析：每组第一个图形是立体图形，第二个图形是这个立体图形的左视图，第三个图形是这个立体图形的俯视图。",
    53: "答案：B。解析：选项中出现'一'、'×'和'\\'这三个面时，'一'与'×'所在的面平行，排除A、C；左边图形折起来后，观察带有一条斜线的面，斜线的一个顶点会交在'+'和'一'面的交线的端点上，据此可排除D；B项可由左边图形折成。",
    54: "答案：A。解析：将左边图形折成右边选项的形状后，左侧面上的线条应该是竖直的，上底面上的线条应该垂直正面，A正确。",
    55: "答案：A。解析：每个图形中都只有一条直线，其余线条均为曲线。",
    56: "答案：B。解析：左右结构的图形和上下结构的图形间隔排列，问号处应是一个上下结构的图形，只有B符合。",
    57: "答案：B。解析：题干图形的直线数都是5，选项中只有B的直线数是5。",
    58: "答案：A。解析：考虑图形中阴影圆圈整体的位置变动。第一个图形中的阴影圆圈向上移动一个位置得到第二个图形，第二个图形中的阴影圆圈向下移动两个位置得到第三个图形，依此循环变化；实际上是，奇数项图形和偶数项图形分别来看，所有黑色圆圈均向下移动一个位置。",
    59: "答案：B。解析：每组第一个图形是立体图形，第二个图形是这个立体图形的左视图，第三个图形是这个立体图形的俯视图。",
    60: "答案：C。解析：左边图形折起来后，空白面不会与阴影三角形的一边相接，A、B错误；C项可由左边图形折成；D项中的三个面不会两两相邻，错误。",
    61: "答案：A。解析：上底面中的斜线与侧面中的斜线应有交点，排除B、D；C项中的空白侧面与带斜线的侧面相对而非相邻，C错误；A项可由左边图形折成。",
    62: "答案：D。解析：1个菱形看作2个三角形，则每个图形都相当于有12个三角形。",
    63: "答案：B。解析：在题干图形中'时针'和'分针'的夹角依次为30°、60°、90°、120°、(150°)。",
    64: "答案：D。解析：题干各图形的交点个数依次为8、7、6、5、（4）。",
    65: "答案：C。解析：第一个图形为原始图形，接下来的每个图形都是由第一个图形去掉两条直线形成的，并且每条直线只去掉一次，选项中只有C符合。",
    66: "答案：C。解析：题干各图形的曲线数依次为1、2、3、4、（5）。",
    67: "答案：C。解析：三角形的规律是，每行第一个三角形和第二个三角形成左右对称，第二个三角形和第三个三角形成左右对称。三角形内的字母规律是每列分别做顺时针、逆时针、顺时针旋转90°。",
    68: "答案：C。解析：规律为第一和第二个图形去同求异，剩下的元素重新组合得到第三个图。",
    69: "答案：B。解析：规律为小圆和小五角星在三角形的上、中、下部都出现一次。",
    70: "答案：A。解析：规律为第一个图形和第二个图形叠加组成第三个图形。",
    71: "答案：C。解析：第一和第二个图相叠加去异存同得到第三个图。",
    72: "答案：B。解析：第一和第二个图相叠加去异存同得到第三个图。",
    73: "答案：D。解析：题干图形都只有1个封闭区域，选项中只有D的封闭区域数为1。",
    74: "答案：A。解析：图形的数量转换。将1个向上的三角形看作4个向下的三角形，则每个图中向下的三角形的个数依次是10、9、8、7，选项中A是6个向下的三角形。",
    75: "答案：D。解析：题干图形的封闭区域数都是6，选项中只有D的封闭区域数是6。",
    76: "答案：B。解析：题干图形中的曲线数都为3，选项中只有B符合。",
    77: "答案：A。解析：题干每个图形中都分别有两种相同的图形相连，且二者所在的直线垂直，选项中只有A中两个三角形相连、两个方形相连，二者所在直线垂直。",
    78: "答案：C。解析：每行前两个图形形状相同，只是大小不同，第三个图形的外部图形与第二个图形相同，内部图形的直线数比外部图形直线数少1，只有C项符合。",
    79: "答案：C。解析：考虑图形中的直线数，问号处应是9，构成连续自然数列，选项中只有C的直线数是9。",
    80: "答案：D。解析：每组第一个图形旋转180°得到第二个图形，第二个图形顺时针旋转90°得到第三个图形。",
    81: "答案：D。解析：从每行来看，前两个图形叠加去同存异得到第三个图形。",
    82: "答案：D。解析：从每行来看，第一个图形的部分线条往里弯曲得到第二个图形，往外弯曲得到第三个图形。",
    83: "答案：B。解析：题干图形中，相邻两个图形含有相同的元素。",
    84: "答案：B。解析：题干图形的种类数均为2。",
    85: "答案：C。解析：图形中的曲线数分别为1、2、3、4、（5），选项中只有C的封闭区域数为5。",
    86: "答案：D。解析：每行均有4种小图形，且小图形个数之和为9。",
    87: "答案：B。解析：第一行各个图形的线条数为9；第二行各个图形的线条数为6；第三行各个图形的线条数为3。",
    88: "答案：A。解析：从每行来看，第一个图形与第二图形叠加去异存同得到第三个图形。",
    89: "答案：C。解析：A项顶面与右侧面中的两条直线不可能相接；B项正面中的线条方向错误；C项正确；D项底面对角线反了。",
    90: "答案：B。解析：将一个'○'看成两个'△'，则题干图形中'△'的个数依次为2、3、5、8、13、（21），构成简单和数列。",
    91: "答案：D。解析：第一行各个图形均有水平对称轴；第二行各个图形均有竖直对称轴；第三行各个图形既有水平对称轴，又有竖直对称轴。",
    92: "答案：B。解析：题干图形均为轴对称图形，且第一行各个图形的重心在中心位置；第二行各个图形的重心在下方；第三行各个图形的重心在上方。",
    93: "答案：A。解析：每组第一个图形为立体图形，第二个图形是立体图形的主视图，第三个图形是立体图形的俯视图。",
    94: "答案：B。解析：题干图形中的曲线数依次为5、4、3、2、1、（0）。",
    95: "答案：C。解析：每组第三个图形中的字母为前两个图形中共有的字母。",
    96: "答案：C。解析：每组各个图形都含有8种小图形。排除A、B；每组图形中各个图形所包含的小图形形状均相同，第一组图中阴影图形的个数分别为1、2、3；第二组图中阴影图形的个数分别为3、2、（1），排除D，故选C。",
    97: "答案：A。解析：第一行各个图形中的交点数为4；第二行各个图形中的交点数为2；第三行各个图形中的交点数为7。",
    98: "答案：B。解析：第一行各个图形的封闭区域数为3；第二行各个图形的封闭区域数为4；第三行各个图形的封闭区域数为5。",
    99: "答案：D。解析：每组第一个图形为立体图形，第二个图形是立体图形的主视图，第三个图形是立体图形的俯视图。",
    100: "答案：C。解析：题干图形中的大三角形内部均有且只有3条交于一点的直线。"
};

// 生成100道题的信息
for (let i = 1; i <= 100; i++) {
    // 计算对应的PDF页面号（假设每页包含2道题）
    const pageNum = Math.ceil(i / 2);
    const pageStr = pageNum.toString().padStart(2, '0');
    
    // 根据题目ID设置正确答案
    let correctAnswer = "C"; // 默认答案
    if (i === 1) correctAnswer = "D";
    else if (i === 2) correctAnswer = "C";
    else if (i === 3) correctAnswer = "D";
    else if (i === 4) correctAnswer = "A";
    else if (i === 5) correctAnswer = "B";
    else if (i === 6) correctAnswer = "D";
    else if (i === 7) correctAnswer = "C";
    else if (i === 8) correctAnswer = "A";
    else if (i === 9) correctAnswer = "D";
    else if (i === 10) correctAnswer = "A";
    else if (i === 11) correctAnswer = "C";
    else if (i === 12) correctAnswer = "B";
    else if (i === 13) correctAnswer = "D";
    else if (i === 14) correctAnswer = "D";
    else if (i === 15) correctAnswer = "B";
    else if (i === 16) correctAnswer = "B";
    else if (i === 17) correctAnswer = "C";
    else if (i === 18) correctAnswer = "A";
    else if (i === 19) correctAnswer = "C";
    else if (i === 20) correctAnswer = "C";
    else if (i === 21) correctAnswer = "D";
    else if (i === 22) correctAnswer = "B";
    else if (i === 23) correctAnswer = "D";
    else if (i === 24) correctAnswer = "C";
    else if (i === 25) correctAnswer = "C";
    else if (i === 26) correctAnswer = "C";
    else if (i === 27) correctAnswer = "A";
    else if (i === 28) correctAnswer = "C";
    else if (i === 29) correctAnswer = "A";
    else if (i === 30) correctAnswer = "C";
    else if (i === 31) correctAnswer = "A";
    else if (i === 32) correctAnswer = "C";
    else if (i === 33) correctAnswer = "D";
    else if (i === 34) correctAnswer = "C";
    else if (i === 35) correctAnswer = "B";
    else if (i === 36) correctAnswer = "A";
    else if (i === 37) correctAnswer = "D";
    else if (i === 38) correctAnswer = "D";
    else if (i === 39) correctAnswer = "C";
    else if (i === 40) correctAnswer = "D";
    else if (i === 41) correctAnswer = "C";
    else if (i === 42) correctAnswer = "A";
    else if (i === 43) correctAnswer = "D";
    else if (i === 44) correctAnswer = "C";
    else if (i === 45) correctAnswer = "C";
    else if (i === 46) correctAnswer = "B";
    else if (i === 47) correctAnswer = "C";
    else if (i === 48) correctAnswer = "D";
    else if (i === 49) correctAnswer = "D";
    else if (i === 50) correctAnswer = "A";
    else if (i === 51) correctAnswer = "C";
    else if (i === 52) correctAnswer = "D";
    else if (i === 53) correctAnswer = "B";
    else if (i === 54) correctAnswer = "A";
    else if (i === 55) correctAnswer = "A";
    else if (i === 56) correctAnswer = "B";
    else if (i === 57) correctAnswer = "B";
    else if (i === 58) correctAnswer = "A";
    else if (i === 59) correctAnswer = "B";
    else if (i === 60) correctAnswer = "C";
    else if (i === 61) correctAnswer = "A";
    else if (i === 62) correctAnswer = "D";
    else if (i === 63) correctAnswer = "B";
    else if (i === 64) correctAnswer = "D";
    else if (i === 65) correctAnswer = "C";
    else if (i === 66) correctAnswer = "C";
    else if (i === 67) correctAnswer = "C";
    else if (i === 68) correctAnswer = "C";
    else if (i === 69) correctAnswer = "B";
    else if (i === 70) correctAnswer = "A";
    else if (i === 71) correctAnswer = "C";
    else if (i === 72) correctAnswer = "B";
    else if (i === 73) correctAnswer = "D";
    else if (i === 74) correctAnswer = "A";
    else if (i === 75) correctAnswer = "D";
    else if (i === 76) correctAnswer = "B";
    else if (i === 77) correctAnswer = "A";
    else if (i === 78) correctAnswer = "C";
    else if (i === 79) correctAnswer = "C";
    else if (i === 80) correctAnswer = "D";
    else if (i === 81) correctAnswer = "D";
    else if (i === 82) correctAnswer = "D";
    else if (i === 83) correctAnswer = "B";
    else if (i === 84) correctAnswer = "B";
    else if (i === 85) correctAnswer = "C";
    else if (i === 86) correctAnswer = "D";
    else if (i === 87) correctAnswer = "B";
    else if (i === 88) correctAnswer = "A";
    else if (i === 89) correctAnswer = "C";
    else if (i === 90) correctAnswer = "B";
    else if (i === 91) correctAnswer = "D";
    else if (i === 92) correctAnswer = "B";
    else if (i === 93) correctAnswer = "A";
    else if (i === 94) correctAnswer = "B";
    else if (i === 95) correctAnswer = "C";
    else if (i === 96) correctAnswer = "C";
    else if (i === 97) correctAnswer = "A";
    else if (i === 98) correctAnswer = "B";
    else if (i === 99) correctAnswer = "D";
    else if (i === 100) correctAnswer = "C";
    
    questions.push({
        id: i,
        question: `第 ${i} 题`,
        image: `img/question${i}.jpg`,
        options: [
            { label: "A", image: `img/option${i}a.jpg` },
            { label: "B", image: `img/option${i}b.jpg` },
            { label: "C", image: `img/option${i}c.jpg` },
            { label: "D", image: `img/option${i}d.jpg` }
        ],
        answer: correctAnswer // 正确答案
    });
}

// 打印题目数量
console.log('生成的题目数量:', questions.length);

// DOM元素
let questionNumberEl;
let questionImageEl;
let optionsEl;
let progressTextEl;
let progressFillEl;
let prevBtnEl;
let nextBtnEl;
let submitBtnEl;
let resultModalEl;
let resultScoreEl;
let resultDetailEl;
let restartBtnEl;
let viewAnswerBtnEl;
let answerContentEl;
let answerTextEl;

// 初始化
function init() {
    // 获取DOM元素
    questionNumberEl = document.getElementById('question-number');
    questionImageEl = document.getElementById('question-image');
    optionsEl = document.getElementById('options');
    progressTextEl = document.getElementById('progress-text');
    progressFillEl = document.getElementById('progress-fill');
    prevBtnEl = document.getElementById('prev-btn');
    nextBtnEl = document.getElementById('next-btn');
    submitBtnEl = document.getElementById('submit-btn');
    resultModalEl = document.getElementById('result-modal');
    resultScoreEl = document.getElementById('result-score');
    resultDetailEl = document.getElementById('result-detail');
    restartBtnEl = document.getElementById('restart-btn');
    viewAnswerBtnEl = document.getElementById('view-answer-btn');
    answerContentEl = document.getElementById('answer-content');
    answerTextEl = document.getElementById('answer-text');
    
    loadQuestion(currentQuestionIndex);
    updateProgress();
    bindEvents();
}

// 加载题目
function loadQuestion(index) {
    const question = questions[index];
    if (!question) return;

    // 更新题目编号
    questionNumberEl.textContent = question.question;

    // 更新题目图片
    questionImageEl.innerHTML = '';
    const img = document.createElement('img');
    img.src = question.image;
    img.alt = `题目${question.id}`;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '300px';
    img.onerror = function() {
        console.error('题目图片加载失败:', question.image);
        questionImageEl.innerHTML = '<div style="color: red; text-align: center; padding: 20px;">图片加载失败</div>';
    };
    questionImageEl.appendChild(img);

    // 更新选项
    optionsEl.innerHTML = '';
    question.options.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = `option ${userAnswers[question.id] === option.label ? 'selected' : ''}`;
        optionEl.dataset.label = option.label;
        
        const labelEl = document.createElement('div');
        labelEl.className = 'option-label';
        labelEl.textContent = option.label;
        
        const imgEl = document.createElement('img');
        imgEl.src = option.image;
        imgEl.alt = option.label;
        imgEl.style.maxWidth = '100%';
        imgEl.style.maxHeight = '150px';
        imgEl.onerror = function() {
            console.error('选项图片加载失败:', option.image);
            const errorDiv = document.createElement('div');
            errorDiv.style.color = 'red';
            errorDiv.style.textAlign = 'center';
            errorDiv.style.padding = '10px';
            errorDiv.textContent = '图片加载失败';
            optionEl.appendChild(errorDiv);
        };
        optionEl.appendChild(labelEl);
        optionEl.appendChild(imgEl);
        optionsEl.appendChild(optionEl);
    });

    // 更新按钮状态
    prevBtnEl.disabled = index === 0;
    if (index === questions.length - 1) {
        nextBtnEl.style.display = 'none';
        submitBtnEl.style.display = 'block';
    } else {
        nextBtnEl.style.display = 'block';
        submitBtnEl.style.display = 'none';
    }
    
    // 隐藏答案内容
    answerContentEl.style.display = 'none';
}

// 更新进度
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFillEl.style.width = `${progress}%`;
    progressTextEl.textContent = `第 ${currentQuestionIndex + 1} 题 / 共 ${questions.length} 题`;
}

// 绑定事件
function bindEvents() {
    // 选项点击事件
    optionsEl.addEventListener('click', (e) => {
        const optionEl = e.target.closest('.option');
        if (optionEl) {
            const label = optionEl.dataset.label;
            const questionId = questions[currentQuestionIndex].id;
            userAnswers[questionId] = label;
            
            // 更新选项样式
            document.querySelectorAll('.option').forEach(el => {
                el.classList.remove('selected');
            });
            optionEl.classList.add('selected');
        }
    });

    // 上一题按钮
    prevBtnEl.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
            updateProgress();
        }
    });

    // 下一题按钮
    nextBtnEl.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
            updateProgress();
        }
    });

    // 提交按钮
    submitBtnEl.addEventListener('click', calculateScore);

    // 重新测试按钮
    restartBtnEl.addEventListener('click', restartQuiz);
    
    // 查看答案按钮
    viewAnswerBtnEl.addEventListener('click', function() {
        const question = questions[currentQuestionIndex];
        const explanation = explanations[question.id] || '暂无解析';
        answerTextEl.textContent = explanation;
        answerContentEl.style.display = 'block';
    });
}

// 计算得分
function calculateScore() {
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let details = '';

    questions.forEach(question => {
        const userAnswer = userAnswers[question.id] || '未作答';
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        const explanation = explanations[question.id] || '';
        
        if (isCorrect) {
            score++;
            correctCount++;
        } else {
            wrongCount++;
        }
        
        // 只显示已作答的题目
        if (userAnswer !== '未作答') {
            details += `
            <div class="question-result ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>第 ${question.id} 题</strong></p>
                <p>你的选择：${userAnswer}</p>
                <p>正确答案：${correctAnswer}</p>
                ${explanation ? `<p>解析：${explanation}</p>` : ''}
            </div>
            `;
        }
    });

    // 显示结果
    resultScoreEl.textContent = `得分：${score} 分`;
    resultDetailEl.innerHTML = `
        <p>总题目数：${questions.length} 题</p>
        <p>正确：${correctCount} 题</p>
        <p>错误：${wrongCount} 题</p>
        <p>正确率：${((correctCount / questions.length) * 100).toFixed(1)}%</p>
        <div class="answers-detail">
            <h3>答题详情</h3>
            ${details || '<p>未作答任何题目</p>'}
        </div>
    `;
    resultModalEl.style.display = 'flex';
}

// 重新测试
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = {};
    loadQuestion(currentQuestionIndex);
    updateProgress();
    resultModalEl.style.display = 'none';
}

// 打印题目数量
console.log('题目数量:', questions.length);

// 初始化应用
init();
