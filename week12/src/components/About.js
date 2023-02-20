import React, {useEffect, useState } from 'react'


function About(){
    let [items, setItems] = useState([]);


    useEffect(() => {
        let isMounted = true;
        
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(isMounted) setItems(data)})
        .catch(err => console.log(err));
        
        return () => isMounted = false;
    }, []);

    return <>
        <h1>About</h1>
        <p>My name is <b>John Doe</b></p>
        <ul>
            {items.map(item => {
                return <li key={item.id}>{item.title}</li>
            })}
        </ul>
        
    </>
}


export default About;