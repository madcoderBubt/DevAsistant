import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import FormatterPage from './pages/FormatterPage';
import DiffPage from './pages/DiffPage';
import JSONParserPage from './pages/JSONParserPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/formatter" replace />} />
                    <Route path="formatter" element={<FormatterPage />} />
                    <Route path="diff" element={<DiffPage />} />
                    <Route path="parser" element={<JSONParserPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
