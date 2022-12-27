import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./hocs/Layout";
import MainPages from "./pages/main";
import './App.css'

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <MainPages />
      </Layout>
    </Router>
  </Provider>
);

export default App;
