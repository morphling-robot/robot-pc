import home from './component/home';
import editor from './component/editor';
import block from './component/block';
import python from './component/python';
import test from './component/test';

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
		path: '/python',
		component: python
	},
	{
		path: '/blockly',
		component: block
	},
	{
		path: '/test',
		component: test
	}
]