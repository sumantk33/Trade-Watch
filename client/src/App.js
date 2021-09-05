import "./App.scss";
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
		</div>
	);
}

export default App;
