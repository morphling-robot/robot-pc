const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');
const i18n = require('./i18n');
const cwd = process.cwd();
const STATIC_PATH = path.resolve(cwd, './dist');
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

let mainWindow;

const winURL = process.env.NODE_ENV === 'development'
	? `http://localhost:8081`
	: path.resolve(__dirname, '../../dist/index.html')

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

	mainWindow.loadURL(winURL);

	mainWindow.on('closed', () =>
		mainWindow = null
	);

	const { webContents } = mainWindow;

	function getLocalTemplate(locale) {
		const localeStr = i18n(locale);
		
		const template = [
			{
				label: localeStr.file,
				submenu: [
					{
						label: localeStr.new,
						submenu: [
							{
								click(menuItem, browserWindow, event) {
									webContents.send('app-new-python');
								},
								label: localeStr.newPython
							},
							{
								click(menuItem, browserWindow, event) {
									webContents.send('app-new-blockly');
								},
								label: localeStr.newBlockly
							}
						]
					},
					{
						click(menuItem, browserWindow, event) {
							webContents.send('app-openfile');
						},
						label: localeStr.open
					},
					{
						click(menuItem, browserWindow, event) {
							webContents.send('app-savefile');
						},
						label: localeStr.save
					},
					{
						type: 'separator'
					},
					{
						click(menuItem, browserWindow, event) {
							webContents.send('app-uploadfile');
						},
						label: localeStr.upload
					},
					{
						click(menuItem, browserWindow, event) {

						},
						label: localeStr.uploadAndRun
					}
				]
			},
			// {
			// 	label: localeStr.edit,
			// 	submenu: [
			// 		{ label: localeStr.undo, role: 'undo' },
			// 		{ label: localeStr.redo, role: 'redo' },
			// 		{ type: 'separator' },
			// 		{ label: localeStr.cut, role: 'cut' },
			// 		{ label: localeStr.copy, role: 'copy' },
			// 		{ label: localeStr.paste, role: 'paste' }
			// 	]
			// },
			{
				label: localeStr.robot,
				submenu: [
					{ 
						click(menuItem, browserWindow, event) {
							webContents.send('app-toggle-connect-dialog');
						},
						label: localeStr.connect
					},
					{ 
						click(menuItem, browserWindow, event) {
							webContents.send('app-toggle-network-dialog');
						},
						label: localeStr.network
					},
					{
						click(menuItem, browserWindow, event) {
							webContents.send('app-toggle-action-dialog');
						},
						label: localeStr.action
					},
					{
						click(menuItem, browserWindow, event) {
							webContents.send('app-toggle-video-dialog');
						},
						label: localeStr.video
					}
				]
			},
			{
				label: localeStr.user,
				submenu: [
					{
						click(menuItem, browserWindow, event) {
							webContents.send('app-toggle-login-dialog');
						},
						label: localeStr.login
					},
					{
						click(menuItem, browserWindow, event) {
							webContents.send('app-toggle-profile-dialog');
						},
						label: localeStr.profile
					},
					{
						click(menuItem, browserWindow, event) {
							webContents.send('app-logout');
						},
						label: localeStr.logout
					}
				]
			},
			{
				label: localeStr.help,
				submenu: [
					{
						label: localeStr.language,
						submenu: [
							{
								click() {
									setLocaleMenu('zh');
									webContents.send('app-change-locale', 'zh');
								},
								label: localeStr.zh
							},
							{
								click() {
									setLocaleMenu('en');
									webContents.send('app-change-locale', 'en');
								},
								label: localeStr.en
							}
						]
					},
					{
						label: localeStr.about
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

		return template;
	}
	
	function setLocaleMenu(locale = 'zh') {
		const template = getLocalTemplate(locale);
		const menu = Menu.buildFromTemplate(template);
		mainWindow.setTitle(i18n(locale).title);
		Menu.setApplicationMenu(menu);
	}

	setLocaleMenu('zh');

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