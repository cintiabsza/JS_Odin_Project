function Book (title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function UI (){

    UI.prototype.addBookToList = function(book) {
      const list =  document.getElementById('book-list');
      const row = document.createElement('tr');
      row.innerHTML = `
       <td>${book.title}</td> 
       <td>${book.author}</td> 
       <td>${book.pages}</td>
       <td>${book.status}</td>
       <td><a href="" class="delete">X</a></td>
       `;
    list.appendChild(row);

    }
    
}

UI.prototype.showAlert = function(message, className){

    const div = document.createElement('div');

    //Add className

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');

    //Get Form
    const form = document.querySelector('#book-form');

    container.insertBefore(div,form);

    //Timeout after 3 seconds
    setTimeout(function (){
        document.querySelector('.alert').remove();
    }, 3000);            
}

//Delete book

UI.prototype.deleteBook = function(target) {

    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}


//Clear Fields


UI.prototype.clearFields = function(){
   document.querySelector('#title').value = '';
   document.querySelector('#author').value = '';
   document.querySelector('#pages').value = '';
   document.querySelector('#status').value = '';
}

//Event Listening

document.getElementById('book-form').addEventListener('submit',function(e){
    
    //Get form values
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const status = document.getElementById('status').value;
    
    
    //Instantiate book
    const book = new Book(title, author, pages, status);
    // console.log(book);
    // Now we have a book object
    
    //Instantiate UL
    const ui = new UI();
    
    
    //Validate
    if(title === '' || author === '' || pages === ''|| status === ''){
        
        //Error alert
        ui.showAlert('Please, fill in all fields!', 'error');
    } else {

         //Add Book to list 
        ui.addBookToList(book);
        
         //Show success
        ui.showAlert('Book Added!', 'success');
    
        //Clear Fields
        ui.clearFields();
        
    }
   
    
  e.preventDefault();  
})

document.getElementById('book-list').addEventListener('click', function(e){

    
    //Instantiate UI
    const ui = new UI();
    // Delete Book
    ui.deleteBook(e.target);
    
    //Show message
    
    ui.showAlert('Book Removed!', 'success');
    
    
    e.preventDefault();
    });