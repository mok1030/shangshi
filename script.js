// 全局变量
let currentQuestionIndex = 0;
let userAnswers = {};
let questions = [];

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
    else if (i === 14) correctAnswer = "D";
    
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
}

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
    14: "答案：D。解析：观察第一组图形，每个图形都是由一个基本图形加上一个小图形组成，且小图形的位置在变化。第二组图形中，前两个图形都是由一个基本图形加上一个小图形组成，因此第三个图形也应该是这样。选项D符合这一规律。"
};

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

// 初始化应用
init();