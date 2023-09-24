import Navbar from './Navbar';
import Cart from './Products';
import React from 'react';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Cart />
      </div>
    );
  }
}
export default App;
