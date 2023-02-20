import React from 'react';

function BookSender() {
    function sendHandler(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData);
        fetch('/api/books', {method: e.target.method, body: formData})
        .catch(err => console.log(err));
    }


    return <>
        <p>Book sender</p>
        <form method="post" onSubmit={sendHandler}>
            <label>
                Name: <input type="text" name="name" />
            </label>
            <label>
                Author: <input type="text" name="author" />
            </label>
            <label>
                Pages: <input type="number" name="pages" />
            </label>
            <button type="submit">Send</button>
        </form>
    </>
}

export default BookSender;