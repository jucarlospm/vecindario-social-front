// import PostsList from "./components/PostsList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

// Modals
import PostModal from "./components/modals/PostModal";

// Components
import Navbar from "./components/Navbar";
import Favicon from "./assets/vecindario-fav-icon.png";

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// Pages
import DashboardPage from "./pages/dashboard";
import GenericPage from "./pages/generic";
import PostPage from "./pages/post";

import store from "./store";
import LoginModal from "./components/modals/LoginModal";

function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Helmet>
            <title>Vecinadario Social</title>
            <link rel="icon" href={Favicon} type="image/png" />
          </Helmet>
          <Navbar />

          <Switch>
            <Route path="/post/:id">
              <PostPage />
            </Route>
            <Route path="/profile">
              <GenericPage pageName="Perfil" />
            </Route>
            <Route path="/messages">
              <GenericPage pageName="Mensajes" />
            </Route>
            <Route path="/groups">
              <GenericPage pageName="Grupos" />
            </Route>
            <Route path="/">
              <DashboardPage />
            </Route>
          </Switch>

          <PostModal />
          <LoginModal />
          <ToastContainer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
