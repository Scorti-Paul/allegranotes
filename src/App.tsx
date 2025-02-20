import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigator from "./navigator";
import ErrorBoundary from "components/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <Navigator />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ErrorBoundary>
    </>
  );
}

export default App;