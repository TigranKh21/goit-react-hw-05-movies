import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { App } from 'App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter basename="/goit-react-hw-05-movies">
      <App />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  </>
);
