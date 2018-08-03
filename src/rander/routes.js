import home from './component/home';
import editor from './component/editor';
import setting from './component/setting';

export default [
	{
		path: '/',
		alias: '/home',
		component: home
	},
	{
		path: '/editor',
		component: editor
	},
	{
		path: '/setting',
		component: setting
	}
]