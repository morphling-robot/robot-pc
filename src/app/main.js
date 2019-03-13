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
	: path.resolve(__dirname, '../../dist/index.html')

if (true) {
	const assetPath = path.resolve(cwd, 'asset');
	const srcPath = path.resolve(__dirname, '../../asset', )
	if (!fs.existsSync(path.resolve(assetPath))) {
		fs.mkdirSync(assetPath, { recursive: true });
		fs.mkdirSync(path.resolve(assetPath, 'i18n'), { recursive: true });
		fs.copyFileSync(path.resolve(srcPath, 'dr_definition.js'), path.resolve(assetPath, 'dr_definition.js'), COPYFILE_EXCL);
		fs.copyFileSync(path.resolve(srcPath, 'dr_generator.js'), path.resolve(assetPath, 'dr_generator.js'), COPYFILE_EXCL);
		fs.copyFileSync(path.resolve(srcPath, 'toolbox.xml'), path.resolve(assetPath, 'toolbox.xml'), COPYFILE_EXCL);
		fs.copyFileSync(path.resolve(srcPath, 'i18n', 'en.js'), path.resolve(assetPath, 'i18n', 'en.js'), COPYFILE_EXCL);
		fs.copyFileSync(path.resolve(srcPath, 'i18n', 'zh-hans.js'), path.resolve(assetPath, 'i18n', 'zh-hans.js'), COPYFILE_EXCL);
	}
}

const Splashscreen = require('@trodi/electron-splashscreen');

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
		}
	});

	Menu.setApplicationMenu(null);

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

	if (process.env.NODE_ENV === 'development') {
		BrowserWindow.addDevToolsExtension(path.resolve(cwd, './src/lib/vue-devtools/4.1.5_0'));
	}
}

app.on('ready', createWindow);

app.on("window-all-closed", () => {
    app.quit();
});