import "./App.css";
import { store } from "./app/store";

import { Provider } from "react-redux";
import { SubjectsList } from "./pages/subjectsList/SubjectsList";

function App() {
  return (
    <Provider store={store}>
      <SubjectsList />
    </Provider>
  );
}

export default App;
