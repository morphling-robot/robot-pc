import home from './pages/home';
import blockly from './pages/editor/blockly';
import python from './pages/editor/python';
// import test from './pages/component/video';

export default [
	{
		path: '/',
		alias: '/home',
		component: blockly
	},
	{
		path: '/python',
		component: python
	},
	{
		path: '/blockly',
		component: blockly
	},
	// {
	// 	path: '/test',
	// 	component: test
	// }
]