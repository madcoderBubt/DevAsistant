import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import FormatterPage from './pages/FormatterPage';
import DiffPage from './pages/DiffPage';
import JSONParserPage from './pages/JSONParserPage';
import UnitConversionPage from './pages/UnitConversionPage';
import ImageConverterPage from './pages/ImageConverterPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/formatter" replace />} />
                    <Route path="formatter" element={<FormatterPage />} />
                    <Route path="diff" element={<DiffPage />} />
                    <Route path="parser" element={<JSONParserPage />} />
                    <Route path="unit-conversion" element={<UnitConversionPage />} />
                    <Route path="image-converter" element={<ImageConverterPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
