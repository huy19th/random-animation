import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router';
import { Layout } from './pages/Layout';
import { Clock } from './pages/Clock';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Clock />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
