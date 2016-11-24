import './polyfills';
import './style';
import Inferno from 'inferno';
require('offline-plugin/runtime').install();

const rootElement = document.getElementById('root');

function init() {
	const App = require('./components/app').default;

	Inferno.render(<App />, rootElement);
}

init();

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./components/app', () => requestAnimationFrame(() => {
		init();
	}));
}