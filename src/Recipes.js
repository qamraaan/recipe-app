import React from 'react';
import style from './recipes.module.css';
const Recipe =({title, calories, image, ingredients}) =>{
    return(
    <div className={style.recipe}>
        <h2>{title}</h2>
        <img className = {style.image}  src={image} alt=''/>
        <p><b>Calories: </b>{calories.toFixed(2)}</p>
        <ol>
            {ingredients.map(ingredient =>(
                <li>{ingredient.text}</li>
            ))}
        </ol>
    
    </div>
    );
};

export default Recipe;