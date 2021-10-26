import Navbar from "./components/Navbar";
// import PostsList from "./components/PostsList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Modals
import PostModal from "./components/modals/PostModal";

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// Pages
import DashboardPage from "./pages/dashboard";
import GenericPage from "./pages/generic";
import PostPage from "./pages/post";


import store from "./store";

function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
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
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
