import React from 'react';
import './homepage.css';

class Homepage extends React.Component {
  render() {
    return (
      <div id="homepage">
        <div className='title'>
          Welcome to the Sixcycle take home evaluation!
        </div>
        <div className='objective'>
          <div className='objectiveTitle'>
            The objective of this project is to create search interface for The Movie Database by querying its public API of movies. At its most basic, the UI should accept a movie title and return results in alphabetical order. The results of this query should include:
          </div>
          <div className='objectiveList'>
            <ul>
              <li>Movie title</li>
              <li>Poster</li>
              <li>Release date</li>
              <li>Overview</li>
            </ul>
          </div>
        </div>
        <div className='asses'>
          <div className='assesTitle'>
            Please create new components outside of the testpage component of this project, then import your components into testpage. Please use only your own code.
          </div>
          <div className='assesSubTitle'>
            We will be assessing you on:
          </div>
          <div className='assesList'>
            <ul>
              <li>Code quality</li>
              <li>Correct use of lifecycles, state, and props</li>
              <li>Organized JSX structure with properly scoped CSS</li>
              <li>Ability to adapt and work within an existing architecture</li>
            </ul>
          </div>
        </div>
        <div className='bonus'>
          <span>Bonus Points: </span>We really want you to wow us. You can do that by showing off your skills in React, by making the UI more featurful or function in a cool way, or by adding any other twists to the project you can think of. Please have fun!
        </div>          
      </div>
    );
  }
}

export default Homepage;


