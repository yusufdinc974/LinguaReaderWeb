import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CustomLists from './pages/CustomLists';
import Contribution from './pages/Contribution';
import MobileApp from './pages/MobileApp';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeleteAccount from './pages/DeleteAccount';
import NotFound from './pages/NotFound';
import { I18nProvider } from './lib/i18n';

export default function App() {
    return (
        <I18nProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/custom-lists" element={<CustomLists />} />
                        <Route path="/contribution" element={<Contribution />} />
                        <Route path="/mobile" element={<MobileApp />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/delete-account" element={<DeleteAccount />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </I18nProvider>
    );
}
