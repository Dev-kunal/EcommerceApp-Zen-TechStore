import ReactDOM from "react-dom";
import { CartProvider } from "./Context/CartProvider";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <CartProvider>
    <Router>
      <App />
    </Router>
  </CartProvider>,
  rootElement
);
