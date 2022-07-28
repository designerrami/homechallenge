import "./App.css";
import store from "./App/store/store";
import { Provider } from "react-redux";
import Navigation from "./App/navigation";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
