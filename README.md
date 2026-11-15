# 旧人旧相逢 · 阿柳

手机优先的单页资料站，浅蓝天空、白云与海，做成一份可以开启的旧人档案。档案编号为 **NO.520**。

## 文件

- `index.html`：页面结构与全部文案
- `style.css`：浅蓝 ins 风格、档案卡、云海与动效
- `app.js`：开启档案、三页切换、重新打开、音乐
- `assets/`：天空海洋背景、四张相知卡片
- `preview/`：预览截图

## 使用

直接双击 `index.html` 即可在浏览器里打开；手机观看时保持竖屏。

本地起服务（推荐）：

```bash
python -m http.server 8000
```

打开 `http://127.0.0.1:8000/`。

## 音乐

- 歌曲：网易云《我怀念的》- 孙燕姿（原版），已转为本地 `assets/music.mp3`（192kbps，约 6.9MB），不再依赖外部外链。
- 右上角按钮标注为“我怀念的-孙燕姿”。
- 进入页面会尝试自动播放；手机浏览器通常会拦截，第一次点击页面任意位置后会开始播放，右上角按钮可随时开关。

## 三页

- 相逢：阿柳、`istp/射手/h/女/17`、主副风格、常驻建模（右对齐）、相逢地点、结尾文案，以及“重新打开档案”。
- 相见：相见条约、须知 11 条、结尾文案。
- 相知：四张卡片，图片使用 `aliu2.docx` 里的四张参考图，分别跳转：

| 卡片 | 链接 |
| --- | --- |
| 卡类 | https://www.kdocs.cn/l/cfoXvjrv7zV7 |
| 话术 | https://www.kdocs.cn/l/cfdxoFlmHYUS |
| 板评 | https://www.kdocs.cn/l/cs89DXihA447 |
| 随笔 | https://www.kdocs.cn/l/ck8oQ5olXux2 |

## 修改文案

- 封面文案：`index.html` 中 `.paper__from`、`.paper__ask`、`.reply`
- 三页内容：`index.html` 中 `data-page="meet" / "rules" / "know"`
- 颜色：`style.css` 顶部 `:root` 里的 `--blue`、`--blue-deep`、`--paper`
- 音乐：`index.html` 底部 `<audio>` 的 `src`
- 卡片图片：替换 `assets/card-*.jpg`，保持文件名不变即可

## 部署

这是纯静态站点，可把 `aliu-site` 文件夹直接拖到 Netlify Drop，或用任意静态托管。`index.html` 保持在根目录，`assets/` 与它同级。

> 注意：`assets/` 区分大小写；音乐已放在 `assets/music.mp3`，部署时请把 `assets` 整个一起上传，不要漏掉音频文件。
