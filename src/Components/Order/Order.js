import React from 'react';
import Classes from './Order.module.css';
const order = (props) => {
    const Ingredients = [];
    
    for (let ingredientName in props.ingredients){
        Ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = Ingredients.map( ig=> {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0px 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
                key={ig.name}> 
                {ig.name} 
                ({ig.amount}) 
                </span>;
    });

    return (
        <div className={Classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );

};

export default order;