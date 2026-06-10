import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ChartContextProvider } from "./context/ChartContextProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ChartContextProvider>
			<App />
		</ChartContextProvider>
	</StrictMode>
);
