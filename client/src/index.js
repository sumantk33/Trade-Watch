import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./utils/redux_store/store";
import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
	<Provider store={store}>
		<ToastProvider>
			<App />
		</ToastProvider>
	</Provider>,
	document.getElementById("root")
);
