import React, { useState, useRef } from 'react'
import MyList from './MyList';

function MyContainer(){
    const [items, setItems] = useState([
        {id:"1", text: "item 1", clicked: false},
        {id:"2", text:"item 2", clicked: false}
    ]);
    const textRef = useRef("");

    const updateItem = (id) => {
        let itemsCopy = [...items]
        itemsCopy.forEach(item => {
            if(item.id === id) item.clicked = !item.clicked;
            console.log(`Updating todo: #${id} was ${!item.clicked}, now ${item.clicked}`)
        })
        setItems(itemsCopy);
    }

    const addItem = () => {
        const newItem = { id: items.length + 1, text: textRef.current.value, clicked: false };
        setItems([...items, newItem])

    }


    return <>
        <MyList updateItem={updateItem} header="header" items={items}/>
        <textarea ref={textRef} placeholder='Type here...'></textarea>
        <button onClick={addItem}>send</button>
    </>
}

export default MyContainer;