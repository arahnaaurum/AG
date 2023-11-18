import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Login from './pages/login/login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<Profile />} />
          </Route>
          <Route path='login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
