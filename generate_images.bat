@echo off

rem 生成题目11到100的图片文件
for /L %%i in (11,1,100) do (
    rem 创建题干图片
    echo ^<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg"^> > img\question%%i.jpg
    echo   ^<rect x="100" y="50" width="400" height="200" stroke="black" stroke-width="2" fill="none"/^> >> img\question%%i.jpg
    echo   ^<text x="300" y="150" font-size="24" text-anchor="middle" dominant-baseline="middle"^>第 %%i 题^</text^> >> img\question%%i.jpg
    echo   ^<text x="300" y="180" font-size="14" text-anchor="middle" dominant-baseline="middle"^>请根据图形规律选择正确答案^</text^> >> img\question%%i.jpg
    echo ^</svg^> >> img\question%%i.jpg
    
    rem 创建选项A图片
    echo ^<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg"^> > img\option%%ia.jpg
    echo   ^<rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/^> >> img\option%%ia.jpg
    echo   ^<text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle"^>A^</text^> >> img\option%%ia.jpg
    echo   ^<text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle"^>选项A^</text^> >> img\option%%ia.jpg
    echo ^</svg^> >> img\option%%ia.jpg
    
    rem 创建选项B图片
    echo ^<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg"^> > img\option%%ib.jpg
    echo   ^<rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/^> >> img\option%%ib.jpg
    echo   ^<text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle"^>B^</text^> >> img\option%%ib.jpg
    echo   ^<text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle"^>选项B^</text^> >> img\option%%ib.jpg
    echo ^</svg^> >> img\option%%ib.jpg
    
    rem 创建选项C图片
    echo ^<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg"^> > img\option%%ic.jpg
    echo   ^<rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/^> >> img\option%%ic.jpg
    echo   ^<text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle"^>C^</text^> >> img\option%%ic.jpg
    echo   ^<text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle"^>选项C^</text^> >> img\option%%ic.jpg
    echo ^</svg^> >> img\option%%ic.jpg
    
    rem 创建选项D图片
    echo ^<svg width="150" height="150" xmlns="http://www.w3.org/2000/svg"^> > img\option%%id.jpg
    echo   ^<rect x="10" y="10" width="130" height="130" stroke="black" stroke-width="2" fill="none"/^> >> img\option%%id.jpg
    echo   ^<text x="75" y="75" font-size="24" text-anchor="middle" dominant-baseline="middle"^>D^</text^> >> img\option%%id.jpg
    echo   ^<text x="75" y="100" font-size="12" text-anchor="middle" dominant-baseline="middle"^>选项D^</text^> >> img\option%%id.jpg
    echo ^</svg^> >> img\option%%id.jpg
    
    echo 生成题目 %%i 的图片文件完成
)

echo 所有图片文件生成完成！
pause
