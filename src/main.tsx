import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ChartContextProvider from "./context/ChartContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ChartContextProvider>
			<App />
		</ChartContextProvider>
	</StrictMode>
);
