import './App.css';
import React, {useEffect, useState} from "react";
import Recipe from './Recipes';

const App = () =>{

  const APP_ID = "41849474";
  const APP_KEY = "8170b36767135285da25268f4aaf60e4";

  // const [counter, setCounter] = useState(0);
  const [recipes, setRecipes] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');
  const [loader, setLoader] = useState(false);
  const [noRecipe, setNoRecipe] = useState(false);

  useEffect(()=>{
    getRecipes();
  },[query]);


  const getRecipes = async ()=>{
  setLoader(true);
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  if(data.hits.length === 0){
    setLoader(false)
    setNoRecipe(true);
    setRecipes(null);
  }
  else{
    setLoader(false)
    setNoRecipe(false);
    setRecipes(data.hits);
  }
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
      <div className='header'>
          <h1>Culinary Recipe App</h1>
      </div>
      <form onSubmit = {getSearch} className='search-form '>
        <input 
        className = "search-bar"
        placeholder = "Search for any delicacy!" 
        type = "text"
        required
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
      {loader && (<div className='loading'><div class="lds-ripple"><div></div><div></div></div></div>)}
      {/* {!loader && recipes.length==0 &&(<div className='not-found'>Oops! No recipes found</div>)} */}
      {!loader && recipes && (recipes.map(recipe =>(
        <Recipe 
        key = {recipe.recipe.index}
        title = {recipe.recipe.label}
        image = {recipe.recipe.image}
        calories = {recipe.recipe.calories}
        ingredients = {recipe.recipe.ingredients}/>
      )))}
      {!loader && noRecipe && (<div className='not-found'>Oops! No recipes found</div>)}
    </div>
    <div className='footer'>
      <h3>Developed by Mohammad Kamran</h3>
      <p>&copy; All Rights Reserved 2022</p>
    </div>
    </div>
  );
};

export default App;