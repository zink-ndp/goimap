import { Provider } from "react-redux";
import { store } from "./redux/store";
import OptionBar from "./component/OptionBar";
import Content from "./component/Content";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <OptionBar />
        <Content />
      </Provider>
    </>
  );
}
