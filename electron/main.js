const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
let pyProc = null;

function startPythonBackend() {
  if (pyProc) return;
  const script = path.join(__dirname, '..', 'python_backend', 'app.py');
  const cmd = process.platform === 'win32' ? 'python' : 'python3';
  pyProc = spawn(cmd, [script]);
  pyProc.stdout.on('data', (d) => console.log(`[PY] ${d}`));
  pyProc.stderr.on('data', (d) => console.error(`[ERR] ${d}`));
  pyProc.on('exit', (code) => console.log('Python exited', code));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });
  win.loadURL('http://localhost:5173');
}

app.whenReady().then(() => {
  startPythonBackend();
  createWindow();
});

