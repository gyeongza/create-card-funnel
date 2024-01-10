import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import Test from './pages/Test';
import Card from './pages/Card';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

import Navbar from './components/common/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';
import Apply from './pages/Apply';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/card/:id" Component={Card} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <Apply />
            </PrivateRoute>
          }
        />
        <Route path="/test" Component={Test} />
        <Route path="/Signup" Component={Signup} />
        <Route path="/Signin" Component={Signin} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
