const { app, BrowserWindow, Menu, dialog } = require('electron');
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
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(winURL);

	mainWindow.on('closed', () =>
		mainWindow = null
	);

	const { webContents } = mainWindow;

	const template = [
		{
			label: 'File',
			submenu: [
				{
					label: 'New...',
					submenu: [
						{
							click(menuItem, browserWindow, event) {
								webContents.send('app-new-python');
							},
							label: 'Python File'
						},
						{
							click(menuItem, browserWindow, event) {
								webContents.send('app-new-blockly');
							},
							label: 'Block File'
						}
					]
				},
				{
					type: 'separator'
				},
				{
					click(menuItem, browserWindow, event) {
						webContents.send('app-openfile');
					},
					label: 'Open File...'
				},
				{
					type: 'separator'
				},
				{
					click(menuItem, browserWindow, event) {
						webContents.send('app-savefile');
					},
					label: 'Save...'
				}
			]
		},
		{
			label: 'Edit',
			submenu: [
				{ role: 'undo' },
				{ role: 'redo' },
				{ type: 'separator' },
				{ role: 'cut' },
				{ role: 'copy' },
				{ role: 'paste' },
				{ role: 'pasteandmatchstyle' },
				{ role: 'delete' },
				{ role: 'selectall' }
			]
		},
		{
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
				{ type: 'separator' },
				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' }
			]
		},
		{
			role: 'window',
			submenu: [
				{ role: 'minimize' },
				{ role: 'close' }
			]
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'Learn More',
					click() { require('electron').shell.openExternal('https://electronjs.org') }
				}
			]
		}
	]
	
	if (process.platform === 'darwin') {
		template.unshift({
			label: app.getName(),
			submenu: [
				{ role: 'about' },
				{ type: 'separator' },
				{ role: 'services', submenu: [] },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideothers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' }
			]
		})
	
		// Edit menu
		template[1].submenu.push(
			{ type: 'separator' },
			{
				label: 'Speech',
				submenu: [
					{ role: 'startspeaking' },
					{ role: 'stopspeaking' }
				]
			}
		)
	
		// Window menu
		template[3].submenu = [
			{ role: 'close' },
			{ role: 'minimize' },
			{ role: 'zoom' },
			{ type: 'separator' },
			{ role: 'front' }
		]
	}

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

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