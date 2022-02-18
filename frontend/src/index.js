import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import ErrorBoundary from './components/layout/pages/ErrorBoundary';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = process.env.axiosURL || 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
