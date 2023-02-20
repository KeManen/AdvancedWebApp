import React from 'react';

function BookSender() {
    function sendHandler(e){
        e.preventDefault();
        const data = {
            "name":e.target.name.value,
            "author":e.target.author.value,
            "pages":e.target.pages.value            
        };
        console.log(data);
        fetch('/api/book', {method: e.target.method, headers: { 'Content-Type': 'application/json' }, mode:"cors", body: JSON.stringify(data)})
        .catch(err => console.log(err));
    }


    return <>
        <p>Book sender</p>
        <form method="post" onSubmit={sendHandler}>
            <label>
                Name: <input id="name" type="text" name="name" />
            </label>
            <label>
                Author: <input id="author" type="text" name="author" />
            </label>
            <label>
                Pages: <input id="pages" type="number" name="pages" />
            </label>
            <button id="submit" type="submit">Send</button>
        </form>
    </>
}

export default BookSender;