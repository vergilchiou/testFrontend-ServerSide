// 折扣碼啟用/停用
document.querySelectorAll('.form-check.form-switch input[type="checkbox"]')
  .forEach((checkbox) => {
    // 用 for 屬性來找出對應的 label
    const label = document.querySelector(`label[for="${checkbox.id}"]`);
    console.log('印出 checkbox');
    console.log(checkbox);
    console.log('印出 label');
    console.log(label);
    // if (!label) return;
    // 根據 checked 狀態更新文字
    const updateLabel = () => {

      label.textContent = checkbox.checked ? '啟用' : '停用';
    };
    // 初始化一次
    updateLabel();
    // 綁定 change 事件
    checkbox.addEventListener('change', updateLabel);
  });