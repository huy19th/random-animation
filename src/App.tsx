import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router';
import {routes} from './common/constants';
import {Clock} from './pages/Clock';
import {Home} from './pages/Home';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />}>
					<Route index element={<Clock />} />
					{routes.map(item => (
						<Route key={item.path} path={item.path} element={item.element} />
					))}
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
