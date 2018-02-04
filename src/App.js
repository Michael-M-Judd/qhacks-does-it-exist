import React, { Component } from 'react';
import Search from './Search.js';
import Card from './Card.js';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Does it Exist?</h1>
          <h2>Using contextual machine learning technology, we can search thousands of startups to find if your idea is already implemented</h2>
        </header>
        <div className="container">
          <Search/>
            <div>
            <p id="results-message">Enter your idea description to view results.</p>

            <section id="search-results">
              <div className="results">
                <Card 
                  image_url="https://lh3.googleusercontent.com/SuY9MJysv6iEhDWipfG3ZmbsTy6McwpiHLevqJahllVOPv4N53CZxhW025pyUeSRL6_x=w300-rw"
                  name="SkinVision"
                  tagline="Check risky skinspots with the SkinVision App for possible melanoma skin cancer symptoms. Make pictures, get moles analyzed, and track them over time."
                  location="Google Play"
                  rating="89"
                  url="https://play.google.com/store/apps/details?id=com.rubytribe.skinvision.ac&hl=en"
                />
              </div>
              <div className="ads">

              </div>
          </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
