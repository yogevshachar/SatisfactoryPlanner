import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ItemSelectionPage from "./pages/ItemSelectionPage";
import AdvancedSettingsPage from "./pages/AdvancedSettingsPage";
import ResultsPage from "./pages/ResultsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/items" element={<ItemSelectionPage />} />
        <Route path="/advanced-settings" element={<AdvancedSettingsPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
