import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function Book() {
    const params = useParams();
    const location = useLocation();

    console.log(params)
    console.log(location)
    const [book, setBook] = useState({});

    useEffect(() => {
        let isMounted = true;
        fetch(`/api/book/${params.bookName}`)
        .then(res => res.json())
        .then(data => {
            if(isMounted) {
                setBook(data);
            }
        })
        .catch(err => console.log(err));

        return () => { isMounted = false; };
    }, [params.bookName]);



    return <>
        <h1>{book.name}</h1>
        <p>{book.author}</p>
        <p>{book.pages}</p>
    </>
}

export default Book;