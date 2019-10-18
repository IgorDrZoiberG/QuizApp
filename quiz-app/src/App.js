import React from 'react';
import Major from "./hoc/Major/Major";
import Quiz from "./containers/Quiz/Quiz";


class App extends React.Component {
  render() {
    return(
        <Major>
        <Quiz/>
        </Major>
    )
  }
}

export default App;
