# 切换到脚本所在目录
Set-Location -Path "$PSScriptRoot"

# 创建img目录（如果不存在）
if (-not (Test-Path "img")) {
    New-Item -ItemType Directory -Path "img"
}

# 生成题目10到100的图片文件
for ($i = 10; $i -le 100; $i++) {
    # 创建题干图片
    $questionContent = @"
<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect x="100" y="50" width="400" height="200" stroke="black" stroke-width="2" fill="none"/>
  <text x="300" y="150" font-size="24" text-anchor="middle" dominant-baseline="middle">第 $i 题</text>
  <text x="300" y="180" font-size="14" text-anchor="middle" dominant-baseline="middle">请根据图形规律选择正确答案</text>
</svg>
"@
    $questionContent | Out-File -FilePath "img\question$i.jpg" -Encoding UTF8
    
    # 创建选项A图片
    $optionAContent = @"
<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/>
  <text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle">A</text>
  <text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle">选项A</text>
</svg>
"@
    $optionAContent | Out-File -FilePath "img\option${i}a.jpg" -Encoding UTF8
    
    # 创建选项B图片
    $optionBContent = @"
<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/>
  <text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle">B</text>
  <text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle">选项B</text>
</svg>
"@
    $optionBContent | Out-File -FilePath "img\option${i}b.jpg" -Encoding UTF8
    
    # 创建选项C图片
    $optionCContent = @"
<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/>
  <text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle">C</text>
  <text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle">选项C</text>
</svg>
"@
    $optionCContent | Out-File -FilePath "img\option${i}c.jpg" -Encoding UTF8
    
    # 创建选项D图片
    $optionDContent = @"
<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/>
  <text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle">D</text>
  <text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle">选项D</text>
</svg>
"@
    $optionDContent | Out-File -FilePath "img\option${i}d.jpg" -Encoding UTF8
    
    Write-Host "生成题目 $i 的图片文件完成"
}

Write-Host "所有图片文件生成完成！"
