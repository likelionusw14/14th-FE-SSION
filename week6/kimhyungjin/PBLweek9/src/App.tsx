import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/lions/:id" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
