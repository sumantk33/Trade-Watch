import "./App.scss";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<div className='app'>
			<Navbar />
			<div className='body-wrapper'>
				<div className='body-container'>
					<Dashboard />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
