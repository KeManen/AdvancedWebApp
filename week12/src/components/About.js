import React, {useEffect, useState } from 'react'


function About(){
    let [items, setItems] = useState([]);


    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            const data = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).catch(err => console.log(err));
            console.log(data);

            if(isMounted){
                setItems(data);
            }
        }
        fetchData();

        return () => { isMounted = false; };
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