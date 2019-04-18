const { app, BrowserWindow, Menu, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const i18n = require('./i18n');
const cwd = process.cwd();
const STATIC_PATH = path.resolve(cwd, './dist');
const isProd = process.env.NODE_ENV === 'development';
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
const { COPYFILE_EXCL } = fs.constants;

let mainWindow;

const winURL = isProd
	? `http://localhost:8081`
	: `file://${path.resolve(__dirname, '../../dist/index.html')}`

const assetPath = path.resolve(app.getPath('userData'), 'asset');
const srcPath = process.srcPath = path.resolve(__dirname, '../../asset')
if (fs.existsSync(path.resolve(app.getPath('userData'))) && 
!fs.existsSync(path.resolve(assetPath))) {
	fs.mkdirSync(assetPath);
	fs.mkdirSync(path.resolve(assetPath, 'i18n'));
	fs.copyFileSync(path.resolve(srcPath, 'dr_definition.js'), path.resolve(assetPath, 'dr_definition.js'), COPYFILE_EXCL);
	fs.copyFileSync(path.resolve(srcPath, 'dr_generator.js'), path.resolve(assetPath, 'dr_generator.js'), COPYFILE_EXCL);
	fs.copyFileSync(path.resolve(srcPath, 'toolbox.xml'), path.resolve(assetPath, 'toolbox.xml'), COPYFILE_EXCL);
	fs.copyFileSync(path.resolve(srcPath, 'i18n', 'en.js'), path.resolve(assetPath, 'i18n', 'en.js'), COPYFILE_EXCL);
	fs.copyFileSync(path.resolve(srcPath, 'i18n', 'zh-hans.js'), path.resolve(assetPath, 'i18n', 'zh-hans.js'), COPYFILE_EXCL);
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1366,
		height: 768,
		minWidth: 1366,
		minHeight: 768,
		useContentSize: true,
		webPreferences: {
			nodeIntegration: true,
			webSecurity: false,
			allowRunningInsecureContent: true
		},
		backgroundColor: '#666',
		show: false
	});

	splash = new BrowserWindow({width: 631, height: 383, transparent: true, frame: false, alwaysOnTop: true});
  splash.loadURL(`file://${path.join(srcPath, "images", "open.svg")}`);

	Menu.setApplicationMenu(null);

	mainWindow.loadURL(winURL);

	mainWindow.on('closed', () =>
		mainWindow = null
	);

	mainWindow.once('ready-to-show', () => {
		splash.destroy();
		mainWindow.show();
	});

	const { webContents } = mainWindow;

	webContents.on('before-input-event', (event, input) => {
		if (input.key === 'F12' && input.type === 'keyDown') {
			webContents.isDevToolsOpened()
				? webContents.closeDevTools()
				: webContents.openDevTools();
		}
	});

	if (process.env.NODE_ENV === 'development') {
		BrowserWindow.addDevToolsExtension(path.resolve(cwd, './src/lib/vue-devtools/4.1.5_0'));
	}
}

app.on('ready', createWindow);

app.on("window-all-closed", () => {
    app.quit();
});