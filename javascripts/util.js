// util.js
/**
 * 回傳當前環境對應的 API base URL。
 * 開發環境 (localhost) 會回傳 http://localhost:8081/api
 * 其餘情況則回傳正式後端完整網址
 */
export function getApiBaseUrl() {
  return window.location.hostname === 'localhost'
    ? 'http://localhost:8081/api'
    : 'https://https://little-chapter-backend.onrender.com/.onrender.com/api';
}
