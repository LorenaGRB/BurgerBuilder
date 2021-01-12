import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';


// Se recibe un objeto como props, queremos un array
const burger = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                return <BurgerIngredient key= {ingredientKey + i} type={ingredientKey} />;
            });
        })
        .reduce ( (arr,el) => {
            return arr.concat(el)
        }, []);
    if (transformIngredients.length === 0){
        transformIngredients = <p>Please, stat adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}> 
        <BurgerIngredient type='bread-top' />
        {transformIngredients}
        <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default burger;