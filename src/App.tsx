import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Test from './pages/Test';
import Card from './pages/Card';
import ScrollToTop from './components/common/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/card/:id" Component={Card} />
        <Route path="/test" Component={Test} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
