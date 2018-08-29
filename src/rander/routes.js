import home from './pages/home';
import blockly from './pages/editor/blockly';
import python from './pages/editor/python';
import test from './pages/component/test';

export default [
	{
		path: '/',
		alias: '/home',
		component: home
	},
	{
		path: '/python',
		component: python
	},
	{
		path: '/blockly',
		component: blockly
	},
	{
		path: '/test',
		component: test
	}
]