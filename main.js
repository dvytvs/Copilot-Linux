const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Copilot",
    icon: path.join(__dirname, 'build/icons/linux/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      spellcheck: true
    }
  });

  // Загружаем сайт
  mainWindow.loadURL('https://copilot.microsoft.com/');

  // Прячем стандартное меню для красоты
  mainWindow.setMenuBarVisibility(false);

  // Обработка открытия ссылок в браузере, а не в окне аппки
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
