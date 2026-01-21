import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { appRoutes } from './app-routes';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Layout>
  );
}

export default App;
