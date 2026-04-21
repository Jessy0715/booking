# Room Reserve — 設計規格與技術說明

> 教室場地借用管理系統 · 前端設計文件  
> 版本：1.0 · 日期：2026-04-20

---

## 1. 設計方向

**風格定位**：精緻暖調極簡（Refined Warm Minimalism）  
**靈感來源**：日本庭院美學 — 清爽、留白、每個元素皆有意義  
**記憶點**：暖陶土色調 × 細緻排版層次 × 無多餘裝飾

---

## 2. Design Tokens（設計令牌）

### 色彩

| Token | 值 | 用途 |
|---|---|---|
| `--bg` | `oklch(0.97 0.008 75)` | 頁面底色（暖米白） |
| `--surface` | `oklch(1 0 0)` | 卡片、面板底色 |
| `--border` | `oklch(0.88 0.01 75)` | 一般邊框 |
| `--border-light` | `oklch(0.93 0.006 75)` | 卡片分隔線 |
| `--text` | `oklch(0.18 0.01 75)` | 主文字（暖近黑） |
| `--text-secondary` | `oklch(0.48 0.01 75)` | 次要文字 |
| `--text-muted` | `oklch(0.65 0.01 75)` | 標籤、說明文字 |
| `--accent` | `oklch(0.52 0.13 42)` | 強調色（陶土暖棕） |
| `--accent-light` | `oklch(0.94 0.04 42)` | 強調色淡背景 |
| `--accent-hover` | `oklch(0.45 0.13 42)` | 強調色懸停態 |
| `--green` | `oklch(0.58 0.1 145)` | 成功 / 可用 |
| `--green-bg` | `oklch(0.95 0.04 145)` | 成功背景 |
| `--blue` | `oklch(0.55 0.12 240)` | 資訊 / 下午時段 |
| `--blue-bg` | `oklch(0.95 0.04 240)` | 資訊背景 |

> **備選強調色**（Tweaks 可切換）
> - 深靛藍 `oklch(0.45 0.15 260)`
> - 苔綠 `oklch(0.48 0.12 145)`
> - 玫瑰紅 `oklch(0.52 0.16 15)`

### 陰影

| Token | 值 |
|---|---|
| `--shadow-sm` | `0 1px 3px oklch(0.5 0.01 75 / 0.08)` |
| `--shadow-md` | `0 4px 16px oklch(0.5 0.01 75 / 0.1)` |
| `--shadow-lg` | `0 8px 32px oklch(0.5 0.01 75 / 0.12)` |

### 圓角

| Token | 值 | 用途 |
|---|---|---|
| `--r` | `10px`（預設，可調 4–18px） | 卡片、按鈕、面板 |

---

## 3. 字型系統

```css
/* 主要中文字型 */
font-family: 'Noto Sans TC', sans-serif;   /* 內文、UI 元素 */
font-family: 'Noto Serif TC', sans-serif;  /* 品牌名稱、頁面標題、空間名稱 */
```

| 用途 | 字型 | 大小 | 字重 | 備註 |
|---|---|---|---|---|
| 品牌名稱 | Noto Serif TC | 15px | 500 | letter-spacing: 0.04em |
| Hero 標題 | Noto Serif TC | 32px | 400 | letter-spacing: 0.06em |
| Hero 副標 | Noto Sans TC | 14px | 300 | line-height: 1.7 |
| 場地名稱 | Noto Serif TC | 15px | 500 | letter-spacing: 0.02em |
| 卡片說明文 | Noto Sans TC | 12.5px | 400 | line-height: 1.6 |
| 規格數值 | Noto Sans TC | 12.5px | 500 | |
| 標籤文字 | Noto Sans TC | 11px | 400 | letter-spacing: 0.02em |
| 時段標題 | Noto Sans TC | 11px | 400 | color: `--text-muted` |
| 時段價格 | Noto Sans TC | 13.5px | 500 | |
| 日期數字 | Noto Sans TC | 12.5px | 400/600 | |

---

## 4. 元件規格

### 4.1 導覽列（Nav）

```
高度：56px
內距：0 40px
背景：white / 0.92 opacity + backdrop-filter: blur(12px)
底邊：1px solid --border-light
position: sticky; top: 0; z-index: 100
```

- **品牌名稱**：Noto Serif TC, 15px, 左對齊
- **登出按鈕**：border 1px `--border`, borderRadius 6px, padding 6px 14px；懸停時邊框與文字變 `--accent`

---

### 4.2 Hero 橫幅

```
高度：260px
背景：深色漸層 oklch(0.25 0.04 55) → oklch(0.15 0.02 75)
裝飾：SVG 幾何圓形（半透明）+ 垂直網格線
文字區：左側漸層遮罩 padding 0 60px
```

層次（由下到上）：
1. 漸層矩形底色
2. 半透明裝飾圓形（暖橙 + 苔綠）
3. 垂直細格線（3% opacity）
4. 左側文字遮罩 `linear-gradient(to right, oklch(0 0 0 / 0.5), transparent)`
5. 文字：標語（11px uppercase）→ 主標題 → 副標題

---

### 4.3 場地卡片（Studio Card）

**佈局**：橫向 flex，左側圖片 + 右側資訊

```
外容器：
  background: --surface
  border: 1px solid --border-light
  border-radius: --r
  padding: 20px
  gap: 24px
  懸停：border-color → --border, box-shadow → --shadow-md
```

**左側圖片區** `200 × 148 px`：
- 以場地專屬色為基礎，SVG 幾何圖形佔位
- border-radius: 8px

**右側資訊欄**（由上到下）：

1. **標題列**：色點 `6×6px rounded` + 場地名稱（serif） + 「前往預約」按鈕（右對齊）
2. **說明文字**：12.5px，color `--text-secondary`，marginLeft 14px
3. **規格列**：坪數 / 高度 / 容量，小標籤 + 數值，gap 16px
4. **標籤列**：pill 形狀，11px，border `--border`，background `--bg`，border-radius 20px
5. **時段價格表**：3 欄 CSS Grid，1px `--border-light` 間隔，中間欄（下午）使用 `--accent-light` 底色

**「前往預約」按鈕**：
```
background: --accent → --accent-hover（懸停）
color: white
padding: 7px 18px
border-radius: 7px
font-size: 13px, font-weight: 500
```

---

### 4.4 分頁器

```
按鈕尺寸：32 × 32px, border-radius: 7px
當前頁：background --accent, color white, border --accent
其他頁：background --surface, border --border
箭頭頁：同其他頁，disabled 時 color --text-muted
```

---

### 4.5 日曆元件

**月份導覽列**（border-bottom 1px）：
- 左右箭頭：30×30px，懸停時 border/color 變 `--accent`
- 月份標題：Noto Serif TC, 16px, 500, letter-spacing 0.06em
- 右側圖例：上午（陶土）/ 下午（靛藍）/ 晚上（苔綠）各 8×8px 方點

**星期列**：12px, 500；日/六 使用 `--accent` 色

**日期格**：
```
minHeight: 80px
padding: 8px 10px
垂直分隔：1px solid --border-light
懸停：background → --bg（非選取狀態）
```

日期數字樣式：
| 狀態 | 樣式 |
|---|---|
| 今日 | 24px 圓形，background `--accent`，color white |
| 選取 | 24px 圓形，border 1.5px `--accent`，color `--accent` |
| 過去 | color `--text-muted`，不可點擊 |
| 週末 | color `--accent` |
| 一般 | color `--text` |

**預約標籤（Booking Chip）**：
- 10px，padding 2px 5px，border-radius 3px
- 上午：`--accent` / `--accent-light`
- 下午：`--blue` / `--blue-bg`
- 晚上：`--green` / `--green-bg`

---

### 4.6 時段選擇器（日期點選後出現）

```
animation: fadeUp 0.25s ease
background: --surface
border: 1px solid --border-light
border-radius: 12px
padding: 20px 24px
display: grid, grid-template-columns: repeat(3, 1fr), gap: 10px
```

每個時段卡：
- 未選：border `--border-light`，background `--surface`
- 已選：border 1.5px 對應時段色，background 對應 bg 色
- 已訂：opacity 0.5，disabled
- 顯示：色點 + 時段名稱 + 時間範圍 + 價格（16px, 600）

---

### 4.7 成功通知橫條

```
animation: fadeUp 0.3s ease
background: --green-bg
border: 1px solid --green
border-radius: 10px
padding: 14px 20px
display: flex, justify-content: space-between
```

---

## 5. 頁面流程

```
列表頁（Listing）
  ↓ 點「前往預約」
日曆頁（Calendar）
  → 點選日期 → 展開時段選擇器
  → 選擇時段 → 啟用「立即預約」按鈕
  → 按「立即預約」→ 顯示成功通知
  ↓ 點「← 返回」
列表頁
```

---

## 6. 動畫規格

```css
/* 頁面切換 */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* 卡片出現（staggered） */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

| 元件 | 動畫 | 時長 | delay |
|---|---|---|---|
| 頁面切換 | fadeIn | 0.3s | 0 |
| 場地卡片 | fadeUp | 0.4s | 0, 0.07s, 0.14s |
| 時段選擇器（展開） | fadeUp | 0.25s | 0 |
| 成功通知 | fadeUp | 0.3s | 0 |
| 懸停過渡（按鈕/卡片） | — | 0.15s | — |

---
