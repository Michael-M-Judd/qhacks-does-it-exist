import React, { Component } from 'react';
// import Search from './Search.js';
import Spinner from 'react-spinkit';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import Card from './Card.js';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
        title: '',
        tagline: '',
        isLoading: false,
        onError: false,
        ideas: [],
        names: []}
    ;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
}



  handleChange = (e) => {
    // update state for form changes
    let newState = {};
  
    newState[e.target.name] = e.target.value;
  
    this.setState(newState);
  };

  handleSubmit(event) {
    this.setState({ isLoading: true }); // start load
    // handling form submission, update components
    event.preventDefault();
    
    let title = this.state.title;
    let tagline = this.state.tagline;

    var data = {
        name: this.state.title,
        description: this.state.tagline,
        sites: {
            devpost: "t",
            github: "t",
            producthunt: "t",
            googleplay: "t"
        }
    }

    var options = {
        method: 'POST',
        headers: 
        new Headers({
            'Content-Type': 'application/json'
          }),
        body: JSON.stringify(data)
    };


    fetch('http://52.242.38.104:5000/score', options)
      .then( response => {
          if (!response.ok) { throw response }
          return response.json()
      })
      .then( json => {
          this.setState({ 
            ideas: json.idea,
            names: json.name });
      })
      .catch( err => {
          console.log('error getting results...')
          this.setState({ onError: true });
      })
    this.setState({ isLoading: false });
  }

  render() {
    const ideas = [];

    if (this.state.ideas !== undefined) {
      const ideas = this.state.ideas.map(result => (
        <Card 
        image_url={result.image_url}
        name={result.title}
        tagline={result.tagline}
        location={result.origin}
        rating={result.ideascore}
        url={result.url}
        tags={result.tags}
      />))
    }

    const names = [];
    if (this.state.names && this.state.names.length > 0) {
      const names = this.state.names.map(result => (
          <Card 
          image_url={result.image_url}
          name={result.title}
          tagline={result.tagline}
          location={result.origin}
          rating={result.namescore}
          url={result.url}
          tags={result.tags}
        />
      ))
    }
    let error = '';
    if ( this.state.onError ) {
      error = "Looks like your idea is pretty unique, get hacking!"
    }
    else if ( this.state.ideas.length ) {
      error = 'We found ' + this.state.ideas.length + ' ideas that matched your description'
    }

    return (
      <div className="App">
        <div className="container">
        <section className="background">
        <header className="App-header">
          <h1 className="App-title">Hacks²</h1>
          <h2>Using contextual machine learning technology, we search thousands of startups to find if your idea is already implemented.</h2>
        </header>
          
          {/* SEARCH */ }
          <div className="search-form">
            <form className="form-control" onSubmit={this.handleSubmit}>
              <div className="search-container">
                <input 
                    name="title" 
                    id="title" 
                    type="search"
                    placeholder="Your app name..." 
                    value={this.state.title} 
                    onChange={this.handleChange}
                />
                <input 
                    name="tagline" 
                    id="tagline"
                    type="search"
                    placeholder="Idea description..." 
                    value={this.state.tagline}
                    onChange={this.handleChange}
                />
                <div className="search-btn-container">
                    <button id="search-btn" type="submit" value="Submit">
                        <span>Search</span>
                        <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </button>
                </div>
              </div>
            </form> 
          </div>
          </section>
          {/* end search */}

            <div>
            {  /* TODO: get loading working this.state.isLoading ? (
              <Spinner name="three-bounce" />
            ) : (
              <p id="results-message">Enter your idea description to view results.</p>
            )
          */ }

            <section id="search-results">
              <div className="results">
                <h3 className="error-message">{error}</h3>
                <CSSTransitionGroup
                  transitionName="example"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                  {ideas}
                </CSSTransitionGroup>
                {names}
              </div>
             
          </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
