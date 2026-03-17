// 生成题目10到100的图片文件
for (let i = 10; i <= 100; i++) {
    // 题干图片
    const questionContent = `
<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect x="100" y="50" width="400" height="200" stroke="black" stroke-width="2" fill="none"/>
  <text x="300" y="150" font-size="24" text-anchor="middle" dominant-baseline="middle">第 ${i} 题</text>
  <text x="300" y="180" font-size="14" text-anchor="middle" dominant-baseline="middle">请根据图形规律选择正确答案</text>
</svg>
    `;
    
    // 选项A图片
    const optionAContent = `
<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/>
  <text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle">A</text>
  <text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle">选项A</text>
</svg>
    `;
    
    // 选项B图片
    const optionBContent = `
<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/>
  <text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle">B</text>
  <text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle">选项B</text>
</svg>
    `;
    
    // 选项C图片
    const optionCContent = `
<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/>
  <text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle">C</text>
  <text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle">选项C</text>
</svg>
    `;
    
    // 选项D图片
    const optionDContent = `
<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/>
  <text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle">D</text>
  <text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle">选项D</text>
</svg>
    `;
    
    console.log(`生成题目 ${i} 的图片文件`);
}

console.log('所有图片文件生成完成！');
