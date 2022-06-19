import './App.css';
import React, {useEffect, useState} from "react";
import Recipe from './Recipes';

const App = () =>{

  const APP_ID = "41849474";
  const APP_KEY = "8170b36767135285da25268f4aaf60e4";

  // const [counter, setCounter] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(()=>{
    getRecipes();
  },[query]);


  const getRecipes = async ()=>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits);
  };

  const updateSearch = e =>{
    setSearch(e.target.value);
    // console.log(search);
  };

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
  return (
    <div className='App' >
      <form onSubmit = {getSearch} className='search-form '>
        <input 
        className = "search-bar"
        placeholder = "Search for any delicacy!" 
        type = "text"
        value = {search} 
        onChange = {updateSearch}></input>
        <button 
        className='search-button'
        type='submit'>
          Search
          </button>
      </form>
      {/* <h1 onClick={() => setCounter(counter+1)}>{counter}</h1> */}
      <div className='recipes'>
      {recipes.map(recipe =>(
        <Recipe 
        key = {recipe.recipe.index}
        title = {recipe.recipe.label}
        calories = {recipe.recipe.calories}
        image = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}/>
      ))}
    </div>
    </div>
  );
};

export default App;