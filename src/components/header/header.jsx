import React from 'react';

class Header extends React.Component {
  render() {
    // it is the components job to accommodate undefined field in the store 
    //console.log('Header rendering');    
    return (
      <div>
          <h2>Sixycle Take Home</h2>
      </div>
    );
  }
}

export default Header;