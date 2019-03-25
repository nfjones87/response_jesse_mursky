import React from 'react';

import './nav.css';


class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage : ''
    };
  }


  componentDidMount(){
    window.dispatcher.off('pagechange').on('pagechange', ()=>{
      this.setState({
        currentPage: window.appStatus.currentPage
      });
    });
  }

  getClassNameWithActive(arg){
    var className = 'navitem';
    if (arg === this.state.currentPage) {
      className += ' active';
    }
    return className;
  }


  render() {
    // it is the components job to accommodate undefined field in the store 
    //console.log('Nav rendering');    
    return (
    <div id="mainnav">
      <a className={this.getClassNameWithActive('home')} href="#">Home</a>
      <a className={this.getClassNameWithActive('test')} href="#/test/">Test</a>
    </div>
    );
  }
}

export default Nav;



