import React from 'react';
import axios from 'axios';

import { compose, withState, withHandlers, lifecycle,withPropsOnChange, withProps, defaultProps } from 'recompose';

import './styles/movies.css';


const enhance = compose(
  withState('search', 'setSearch', 'ye'),
  withHandlers({
    onChange: props => event => {
    console.log(event.target.value);
    console.log('search',props);
      props.setSearch(event.target.value);
      props.update(event.target.value);
    }
  })
)

const SearchBar = enhance (({onChange})=>
        <div>
        <input onChange={onChange} />
        </div>   
)


// const movielistEnhance = compose(
//    withPropsOnChange((['search'],{search}) => {
//         return props.movies
//     })
// )

const MovieList = ({ movies }) => {
    return (
        <div className="row">
            {movies.map((item, id) => (
                <div key={id} className="pics col-lg-3 pull-left">
                    <h3>{item.Title}</h3>

                    <img src={item.Poster} alt={item.Description}  />
                </div>

            ))}

        </div>)
}

const SingleMovie = ({singleMovie}) => {
    return(<div>

    </div>

    )
}

const Movies = ({ movies,onChange,updateSearchHandler, updatedSearch }) => {
    return (
        <div>

            <SearchBar update={updateSearchHandler}/>
            <h2>You entered:{updatedSearch} </h2>

            <MovieList movies={movies} /> 

        </div>
    )
}
const httpCall = (search, cb)=>{
    axios({
                method: 'get',
                url: ' http://www.omdbapi.com/?s=' + search,
            })
                .then(function (response) {
                    console.log('search', search)
                    cb(response.data.Search || []);
                });
        }

export default compose(
   
    withState('movies', 'setMovies', []),
    withHandlers({
        updateSearchHandler :props => (search) =>{
            httpCall(search, props.setMovies);
        }
    }),

    lifecycle({
        componentDidMount() {
            const setMovies = this.props.setMovies;
            const search = this.props.search;
            axios({
                method: 'get',
                url: ' http://www.omdbapi.com/?s=' + search,
            })
                .then(function (response) {
                    setMovies(response.data.Search);
                });
        },
        componentDidUpdate(prevProps, prevState) {
            console.log("args... ", prevProps, this.props)
            let self = this
            if (prevProps.search !== this.props.search) {

                axios({
                    method: 'get',
                    url: ' http://www.omdbapi.com/?s=' + this.props.search,
                })
                    .then(function (response) {
                        
                        self.props.setMovies(response.data.Search);
                    });
            }

        }
    }),
    defaultProps({
        search: 'green',
        updatedSearch: "Hello"
})

)(Movies);


