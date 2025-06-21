# 📘 親子繪本電商網站：後台管理系統

本專案為「親子繪本電商平台」的後台管理系統，提供管理員操作商品、訂單、分類等功能，方便進行內容維護與營運管理。前端頁面以 Handlebars 樣板引擎建構，並串接既有後端 API。

---

## 📌 專案功能介紹

### 🔐 管理員登入

* 管理員帳號登入（Email + 密碼）
* JWT 驗證保護頁面存取
* 登入後顯示管理員名稱與 email
* 登出功能

### 📚 商品管理

* 商品列表（分頁、分類篩選、主圖顯示）
* 新增商品：基本資料、敘述（Summernote）、圖片上傳（6 張、主圖設定）
* 編輯商品：修改所有欄位與新增圖片
* 商品狀態切換（上/下架）

### 📦 訂單管理

* 訂單列表：狀態/日期篩選、分頁顯示
* 訂單詳情：分頁顯示物流、付款、商品明細
* 動態按鈕操作：出貨、退貨、退款（由 API `?type=value` 控制）

### 🧩 分類與標籤管理

* 商品分類列表、狀態開關
* 新增/編輯分類
* 年齡區間、主題類型供商品使用

### ✅ 其他功能

* Toast 通知提示
* Bootstrap Modal 操作介面
* 表單欄位驗證（含 ISBN 驗證）

---

## 🔧 專案技術資訊

### 前端

* HTML + Handlebars.js（樣板引擎）
* Bootstrap 5 + @popperjs/core（下拉選單、彈窗）
* jQuery（DOM 操作與 AJAX）
* Summernote（商品介紹編輯器）

### 後端（API 串接端）

* 串接 Express API
* JWT 驗證機制（token 驗證 header）
* dotenv 管理環境變數

### 資料庫（後端 API 端）

* PostgreSQL（UUID、外鍵關聯、完整 ER 架構）

### 其他套件 / 服務

* Google Cloud Storage（圖片上傳）
* multer（上傳處理）
* validator.js（欄位驗證）
* Luxon（時間處理）

> ⚠️ 本專案僅涵蓋後台前端與 API 串接邏輯，實際後端 API 開發部分由其他 Repo 管理，故不納入此說明。

---

## ⚙️ 安裝與啟動方式

```bash
# 1. 安裝相依套件
npm install

# 2. 啟動開發伺服器（含 livereload）
npm run dev

# 3. 設定環境變數 .env
# EXAMPLE:
API_BASE_URL=https://your-api-url.com/api/v1
```

> 📁 預設啟動後會監聽 Handlebars 檔案並自動刷新頁面。

---

## 📁 專案資料夾結構

```
├── app.js                   # 專案主程式，啟動 Express 應用
├── javascripts/            # 所有客製化前端 JS（事件處理、共用函式）
│   ├── all.js
│   ├── discountCodeSwitchs.js
│   └── util.js
├── stylesheets/            # SCSS 與編譯後 CSS 檔案
│   ├── all.scss            # 主 SCSS 檔案
│   ├── all.css             # 編譯後 CSS
│   ├── components/         # SCSS 子元件
│   └── helpers/            # SCSS 函式與變數
├── public/                 # 公開靜態資源（如圖片）
│   └── images/
├── views/                  # Handlebars 模板
│   ├── layouts/            # 主版型（如 main.hbs）
│   ├── partials/           # 共用區塊（如 header, sidebar）
│   ├── *.hbs               # 各功能頁面模板（如 index, products, orders）
│   └── test/               # 測試用畫面或模板
├── package.json            # 套件管理設定
├── nodemon.json            # 開發環境監聽設定
├── README.md
├── README.pdf              # PDF 版說明文件
├── livereload-setup.md    # Livereload 說明文件
```

---

<!-- ## 🖼️ 畫面截圖（Screenshots）

### 🔐 管理員登入

```md
![登入畫面](./screenshots/login.png)
```

### 📚 商品管理

```md
![商品列表](./screenshots/product-list.png)
![新增商品](./screenshots/product-add.png)
![商品圖片上傳](./screenshots/product-images.png)
![編輯商品](./screenshots/product-edit.png)
```

### 📦 訂單管理

```md
![訂單列表](./screenshots/order-list.png)
![訂單詳情](./screenshots/order-detail.png)
![訂單操作 modal](./screenshots/order-action-modal.png)
```

### 🧩 分類管理

```md
![商品分類](./screenshots/category-list.png)
![新增分類](./screenshots/category-edit.png)
```

### ✅ 互動提示

```md
![成功通知 Toast](./screenshots/toast-success.png)
![操作 Modal](./screenshots/modal-example.png)
```

--- -->

## 🔮 未來功能規劃
- [ ] 活動優惠設定：支援折扣碼類型更多樣，含時間限制、自動套用等
- [ ] 專屬通知中心：訂單更新、庫存不足提醒推送通知，對全體或特定用戶發送訊息
- [ ] 用戶管理功能：搜尋、篩選用戶帳號，新增用戶
- [ ] 折扣碼管理：折扣碼 CRUD
- [ ] 專區商品管理：熱門書籍專區/本月亮點新書專區/套裝推薦專區

## ✉️ 聯絡作者

若您對本專案有任何問題或建議，歡迎來信聯絡：vergilchiou@gmail.com



## 👤 開發者資訊

本專案由本人負責「後台前端網頁介面設計」與「API 串接邏輯」，包含頁面互動、資料顯示、表單驗證與畫面回饋等部分。

---
