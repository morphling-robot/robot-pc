const { app, BrowserWindow } = require('electron');
const path = require('path');
const cwd = process.cwd();
const STATIC_PATH = path.resolve(cwd, './dist');
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

let mainWindow;

const winURL = process.env.NODE_ENV === 'development'
	? `http://localhost:8081`
	: `file://${STATIC_PATH}/index.html`

function createWindow() {

	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768,
		useContentSize: true,
		webPreferences: {
      nodeIntegration: false
    }
	});

	mainWindow.loadURL(winURL);

	mainWindow.on('closed', () =>
		mainWindow = null
	);

	const { webContents } = mainWindow;

	webContents.on('before-input-event', (event, input) => {
		if (input.key === 'F12' && input.type === 'keyDown') {
			webContents.isDevToolsOpened()
				? webContents.closeDevTools()
				: webContents.openDevTools();
		}
	});
}

app.on('ready', createWindow);