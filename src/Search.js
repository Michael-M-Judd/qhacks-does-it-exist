import React, { Component } from 'react';
import Card from './Card.js';


class Search extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            tagline: '',
            results: []}
        ;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        let newState = {};
       
        newState[e.target.name] = e.target.value;
       
        this.setState(newState);
    };

    handleSubmit(event) {
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
                return response.json()  //we only get here if there is no error
            })
            .then( json => {
                this.setState({ results: json.idea });
            })
            .catch( err => {
                err.text().then( errorMessage => {
                console.log('error getting results...')
                })
            })

      }
    
    render() {
      return (
          
          <div>
             
        
        <form className="form-control" onSubmit={this.handleSubmit}>
            <div className="search-container">
            
                <input 
                    name="title" 
                    id="title" 
                    type="search"
                    placeholder="Your app name" 
                    value={this.state.title} 
                    onChange={this.handleChange}
                />
                <input 
                    name="tagline" 
                    id="tagline"
                    type="search"
                    placeholder="Computer vision for skin cancer diagnosis..." 
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
        {this.state.results.map(result =>
                <Card 
                image_url={result.image_url}
                name={result.title}
                tagline={result.tagline}
                location={result.origin}
                rating={result.ideascore}
                url={result.url}
              />
            )}
        </div>

      );
    }
  }
  
  export default Search;
  