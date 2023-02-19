import React from 'react'


function MyList (props){

    return <>
        <h1>{props.header}</h1>
        <ol>
            {props.items.map(item => 
            <li key={item.id} onClick={() => props.updateItem(item.id)} style={{"textDecoration": item.clicked ? "line-through" : ""}}>{item.text}</li>)
            }
        </ol>
    </>
}

export default MyList;