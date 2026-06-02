import DataView from "./layout/DataView";

function App() {
	return (
		<div className="w-full h-screen overflow-hidden flex flex-col">
			<header className="w-full p-4 border-b border-b-gray-300">
				<h1 className="text-xl font-semibold">Bar Chart Visualizer</h1>
			</header>
			<main className="w-full flex flex-1 overflow-hidden">
				<DataView />
			</main>
		</div>
	);
}

export default App;
