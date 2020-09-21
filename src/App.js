import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Test1 from "./screen/Test1";
import AdminScreen from "./screen/AdminScreen";
import UserScreen from "./screen/UserScreen";
import DatePickerTest from "./screen/DatePickerTest";
import ResultFilter from "./screen/ResultFilter";
import SelectedGraph from "./screen/SelectedGraph";
import "./App.css";

function App() {
  return (
    // <DatePicker />
    <Switch>
      <Route exact path="/" component={DatePickerTest} />
      <Route path="/result" component={ResultFilter} />
      <Route path="/admin" component={AdminScreen} />
      <Route path="/user" component={UserScreen} />
      <Route path="/showGraph" component={SelectedGraph} />
    </Switch>
  );
}

export default App;
