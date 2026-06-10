import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import CustomCalligraphy from './pages/CustomCalligraphy';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/custom-calligraphy" element={<CustomCalligraphy />} />
          {/* Catch-all route to redirect back to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}
