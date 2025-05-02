import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { routes } from './common/constants';
import { Clock } from './pages/Clock';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<Clock />} />
          {routes.map(item => <Route key={item.path} path={item.path} element={item.element} />)}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
