// app.js
import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
// 
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import fs from 'fs';
import chokidar from 'chokidar';

// 修正 __dirname（ES module 中無法直接使用）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 建立 Express App
const app = express();

// 建立 Handlebars 引擎實例（新版）
const hbs = create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),

  // helpers: {}
});

// Livereload 監聽
app.use(connectLivereload());

// 靜態資源註冊
app.use('/stylesheets', express.static(path.join(__dirname, 'stylesheets')));
app.use('/javascripts', express.static(path.join(__dirname, 'javascripts')));

// 註冊 Handlebars 為模板引擎
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 設定靜態檔案路徑（支援 CSS、JS 等）
app.use(express.static(path.join(__dirname, 'stylesheets')));
app.use(express.static(path.join(__dirname, 'javascripts')));
app.use(express.static(path.join(__dirname, 'public')));

// 圖片
app.use(express.static(path.join(__dirname, 'public')));

// 路由範例
app.get('/admin/login', (req, res) => {
  res.render('adminLogin'); // 對應 views/adminLogin.hbs
});

app.get('/index', (req, res) => {
  const time = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
  console.log(`💡 [戳醒紀錄] 收到 GET /index 請求於 ${time}`);
  res.render('index');
});

app.get('/users', (req, res) => {
  res.render('users');
});

app.get('/orders', (req, res) => {
  res.render('orders');
});

app.get('/ordersEdit', (req, res) => {
  res.render('ordersEdit');
});

app.get('/ordersDetail', (req, res) => {
  res.render('ordersDetail');
});


app.get('/products', (req, res) => {
  res.render('products');
});



app.get('/productsAdd', (req, res) => {
  res.render('productsAdd', {
    statuses: [
      { value: 'up', label: '已上架' },
      { value: 'down', label: '已下架' }
    ],
    ageRanges: [ /* 從資料庫撈 */],
    themes: [ /* 從資料庫撈 */],
    tags: [ /* 從資料庫撈 */]
  });
});

app.get('/productsEdit', (req, res) => {
  res.render('productsEdit', {
    statuses: [
      { value: 'up', label: '已上架' },
      { value: 'down', label: '已下架' }
    ],
    ageRanges: [ /* 從資料庫撈 */],
    themes: [ /* 從資料庫撈 */],
    tags: [ /* 從資料庫撈 */]
  });
});

app.get('/productsTheme', (req, res) => {

  // demo假資料用
  // const themes = [
  //   { id: 1, name: '健康生活', bookCount: 20 },
  //   { id: 2, name: '科學知識', bookCount: 50 },
  //   { id: 3, name: '藝術啟蒙', bookCount: 30 },
  //   { id: 4, name: '音樂欣賞', bookCount: 20 },
  //   { id: 5, name: '勵志成長', bookCount: 35 }
  // ];

  // demo假資料用
  // res.render('productsTheme', { themes });
  res.render('productsTheme');
});

app.get('/productsTheme-create', (req, res) => {

  res.render('productsTheme-create');
});

app.get('/productsTheme-edit/:categoryId', (req, res) => {

  // console.log(req.params);

  // const themeId = parseInt(req.params.categoryId, 10);

  // 🧪 demo 假資料
  // const mockThemes = [
  //   { id: 1, name: '健康生活', description: '與健康生活相關的書籍', status: 'enabled' },
  //   { id: 2, name: '科學知識', description: '科普與探索書籍', status: 'enabled' },
  //   { id: 3, name: '藝術啟蒙', description: '給孩子的藝術教育書', status: 'disabled' },
  // ];


  // const theme = mockThemes.find(t => t.id === themeId);

  // if (!theme) {
  //   return res.status(404).send('找不到這個分類');
  // }

  // res.render('productsTheme-edit', { theme });


  res.render('productsTheme-edit');
});


app.get('/discountCodes', (req, res) => {
  res.render('discountCodes');
});

// 
app.get('/selectedHot', (req, res) => {


  const selectedProducts = [
    {
      cover: '/images/product1.png',
      name: '好餓的毛毛蟲',
      category: '熱門商品',
      position: 1,
      enabled: true
    },
    {
      cover: '/images/product2.png',
      name: '晚安，月亮',
      category: '熱門商品',
      position: 2,
      enabled: true
    },
    {
      cover: '/images/product3.png',
      name: '野獸國',
      category: '熱門商品',
      position: 3,
      enabled: true
    },
    {
      cover: '/images/product4.png',
      name: '戴帽子的貓',
      category: '最新商品',
      position: 4,
      enabled: false
    },
    {
      cover: '/images/product5.png',
      name: '棕熊，棕熊，你在看什麼？',
      category: '最新商品',
      position: 5,
      enabled: false
    }
  ];


  // ✅ 預處理樣式與顯示用欄位
  const processedProducts = selectedProducts.map(p => ({
    ...p,
    categoryBadgeClass: p.category === '熱門商品' ? 'danger' : 'primary',
    enabledText: p.enabled ? '啟用' : '停用'
  }));

  res.render('selectedHot', { selectedProducts: processedProducts });
});

// 
app.get('/selectedNews', (req, res) => {

  // demo 用
  // 之後從資料庫抓
  const selectedProducts = [
    {
      cover: '/images/product1.png',
      name: '好餓的毛毛蟲',
      category: '熱門商品',
      position: 1,
      enabled: true
    },
    {
      cover: '/images/product2.png',
      name: '晚安，月亮',
      category: '熱門商品',
      position: 2,
      enabled: true
    },
    {
      cover: '/images/product3.png',
      name: '野獸國',
      category: '熱門商品',
      position: 3,
      enabled: true
    },
    {
      cover: '/images/product4.png',
      name: '戴帽子的貓',
      category: '最新商品',
      position: 4,
      enabled: false
    },
    {
      cover: '/images/product5.png',
      name: '棕熊，棕熊，你在看什麼？',
      category: '最新商品',
      position: 5,
      enabled: false
    }
  ];


  // ✅ 預處理樣式與顯示用欄位
  const processedProducts = selectedProducts.map(p => ({
    ...p,
    categoryBadgeClass: p.category === '熱門商品' ? 'danger' : 'primary',
    enabledText: p.enabled ? '啟用' : '停用'
  }));

  res.render('selectedNews', { selectedProducts: processedProducts });
});

// 
app.get('/selectedBoxSet', (req, res) => {

  // demo 用
  // 之後從資料庫抓
  const selectedProducts = [
    {
      cover: '/images/product1.png',
      name: '好餓的毛毛蟲',
      category: '熱門商品',
      position: 1,
      enabled: true
    },
    {
      cover: '/images/product2.png',
      name: '晚安，月亮',
      category: '熱門商品',
      position: 2,
      enabled: true
    },
    {
      cover: '/images/product3.png',
      name: '野獸國',
      category: '熱門商品',
      position: 3,
      enabled: true
    },
    {
      cover: '/images/product4.png',
      name: '戴帽子的貓',
      category: '最新商品',
      position: 4,
      enabled: false
    },
    {
      cover: '/images/product5.png',
      name: '棕熊，棕熊，你在看什麼？',
      category: '最新商品',
      position: 5,
      enabled: false
    }
  ];


  // ✅ 預處理樣式與顯示用欄位
  const processedProducts = selectedProducts.map(p => ({
    ...p,
    categoryBadgeClass: p.category === '熱門商品' ? 'danger' : 'primary',
    enabledText: p.enabled ? '啟用' : '停用'
  }));

  res.render('selectedBoxSet', { selectedProducts: processedProducts });
});

app.get('/notifications', (req, res) => {
  const notifications = [
    {
      title: '夏季新品上架',
      content: '查看我們的夏季兒童書籍新品！',
      recipient: '所有用戶',
      date: '2023-04-15',
      status: '已發送',
      badgeClass: 'success'
    },
    {
      title: '訂單已出貨',
      content: '您的訂單 #3210 已出貨！',
      recipient: 'Olivia Martin',
      date: '2023-04-23',
      status: '已發送',
      badgeClass: 'success'
    },
    {
      title: '訂單已送達',
      content: '您的訂單 #3208 已送達！',
      recipient: 'Sofia Davis',
      date: '2023-04-22',
      status: '已發送',
      badgeClass: 'success'
    },
    {
      title: '限時優惠',
      content: '限時優惠！所有書籍24小時內享20%折扣！',
      recipient: '所有用戶',
      date: '2023-05-01',
      status: '已排程',
      badgeClass: 'dark'
    },
    {
      title: '新帳戶歡迎',
      content: '歡迎來到我們的商店！使用代碼 WELCOME10 獲得首次訂單10%的折扣。',
      recipient: '新用戶',
      date: '自動',
      status: '啟用中',
      badgeClass: 'dark'
    }
  ];

  res.render('notifications', { notifications });
});


app.get('/message', (req, res) => {
  const messages = [
    {
      sender: 'Olivia Martin',
      subject: '訂單 #3210 問題',
      message: '我想知道我的訂單何時會出貨？',
      date: '2023-04-23',
      status: '未讀',
      statusBadge: 'dark'
    },
    {
      sender: 'William Kim',
      subject: '訂單 #3209 問題',
      message: '我收到了錯誤的書籍。',
      date: '2023-04-22',
      status: '未讀',
      statusBadge: 'dark'
    },
    {
      sender: 'Sofia Davis',
      subject: '感謝',
      message: '我只是想說謝謝你們的優質服務！',
      date: '2023-04-22',
      status: '已讀',
      statusBadge: 'secondary'
    },
    {
      sender: 'Jackson Lee',
      subject: '訂單 #3207 取消',
      message: '如果還沒出貨，我想取消我的訂單。',
      date: '2023-04-21',
      status: '已回覆',
      statusBadge: 'success'
    },
    {
      sender: 'Isabella Nguyen',
      subject: '書籍推薦',
      message: '你們有沒有適合5歲喜歡動物的孩子的推薦書籍？',
      date: '2023-04-20',
      status: '已讀',
      statusBadge: 'secondary'
    }
  ];

  res.render('message', { messages });
});


// 你可以依此類推加入更多頁面

// 自動監聽 .hbs
const liveReloadServer = livereload.createServer();


const watcher = chokidar.watch([
  path.join(__dirname, 'views'),
  path.join(__dirname, 'stylesheets'),
  path.join(__dirname, 'javascripts')
]);

// ✅ 補上這段 👇
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// 
console.log("✅ LiveReload server 已啟動 (port 35729)");

watcher.on('change', (filePath) => {
  console.log(`🔄 File changed: ${filePath}`);
  liveReloadServer.refresh('/');
});

// 啟動伺服器
// const PORT = 3000;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('⚙️ process.env:', process.env);
  console.log(`後台系統已啟動：http://localhost:${PORT}（環境：${process.env.NODE_ENV || 'local'}）`);
});