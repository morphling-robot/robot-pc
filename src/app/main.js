const { app, BrowserWindow, Menu, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const isProd = process.env.NODE_ENV === 'development';
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
const { COPYFILE_EXCL } = fs.constants;

let mainWindow;

const winURL = isProd
	? `http://localhost:8081`
	: `file://${path.resolve(__dirname, '../../dist/index.html')}`

function copyDir(src, target) {
	if (!fs.existsSync(path.resolve(target))) {
		fs.mkdirSync(target);
	}
	
	const files = fs.readdirSync(src);

	files.forEach(file => {
		const srcPath = path.resolve(src, `./${file}`);

		const targetPath = path.resolve(target, `./${file}`);
		const result = fs.statSync(srcPath);
		
		if (result.isFile()) {
			if (fs.existsSync(path.resolve(targetPath))) {
				fs.unlinkSync(targetPath);
			}

			fs.copyFileSync(srcPath, targetPath, COPYFILE_EXCL);
		} else if (result.isDirectory()) {
			copyDir(srcPath, targetPath);
		}
	});
}

const assetPath = path.resolve(app.getPath('userData'), 'asset');
const srcPath = process.srcPath = path.resolve(__dirname, '../../asset');

if (fs.existsSync(path.resolve(app.getPath('userData')))) {
	copyDir(srcPath, assetPath);
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

	// splash = new BrowserWindow({width: 631, height: 383, transparent: true, frame: false, alwaysOnTop: true});
  // splash.loadURL(`file://${path.join(srcPath, "images", "open.svg")}`);

	Menu.setApplicationMenu(null);

	mainWindow.loadURL(winURL);

	mainWindow.on('closed', () =>
		mainWindow = null
	);

	mainWindow.once('ready-to-show', () => {
		// splash.destroy();
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