const electron = require('electron');
const path = require('path'); // Add this line
const { updateElectronApp } = require('update-electron-app');

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

app.on('ready', () => {
  updateElectronApp();
  createWindow();
});

// Define the path to your index.html file
const indexPath = path.join(__dirname, 'index.html'); // Assuming index.html is in the same directory as your main script

let mainWindow;

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    show: false,
    autoHideMenuBar: true,
  });

  mainWindow.loadFile(indexPath); // Load the local index.html file

  mainWindow.webContents.once('dom-ready', function () {
    mainWindow.show();
    mainWindow.maximize();
    // mainWindow.webContents.openDevTools();
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow) // <== this is extra so commented, enabling this can show 2 windows..

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    // PHP SERVER QUIT
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
