import './App.css'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router';
import { Home } from './pages/Home';
import { routes } from './common/constants';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />}>
          <Route index element={<Navigate to='clock'/>} />
          {routes.map(item => <Route path={item.path as string} element={item.element}/>)}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
