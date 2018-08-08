import home from './component/pages/home';
import blockly from './component/pages/editor/blockly';
import python from './component/pages/editor/python';
import test from './component/pages/utils/test';

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