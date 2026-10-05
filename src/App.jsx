import React from "react";
import { Navigate, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";

function App() {
	return (
		<Router>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/project/:slug" element={<ProjectPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
