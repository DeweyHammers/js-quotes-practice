class Quote {
  constructor(json) {
    this.id = json.id;
    this.quote = json.quote;
    this.author = json.author;
    this.likes = json.likes;
  }

  createAndRenderHtml() {
    const ul = document.querySelector('#quote-list');
    const li = document.createElement('li');
    const blockquote = document.createElement('blockquote');
    const p = document.createElement('p');
    const footer = document.createElement('footer');
    const buttonLike = document.createElement('button');
    const span = document.createElement('span');
    const buttonDelete = document.createElement('button');
    li.className = 'quote-card';
    blockquote.className = 'blockquote';
    p.className = 'mb-0';
    footer.className = 'blockquote-footer';
    buttonLike.className = 'btn-success';
    buttonDelete.className = 'btn-danger';
    p.innerText = this.quote;
    footer.innerText = this.author;
    buttonLike.innerText = 'Likes: ' 
    span.innerText = this.likes.length;
    buttonLike.appendChild(span);
    buttonDelete.innerText = 'Delete'
    blockquote.appendChild(p);
    blockquote.appendChild(footer);
    blockquote.appendChild(buttonLike);
    blockquote.appendChild(buttonDelete);
    li.appendChild(blockquote);
    ul.appendChild(li);
    this.addLikeListener(buttonLike);
    this.addDeleteListener(buttonDelete, ul, li);
  }

  addLikeListener(button) {
    button.addEventListener('click', () => {
      fetch('http://localhost:3000/likes', { 
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          quoteId: this.id,
          createAt: Date.now()
        })
      })
      .then(() => {
        const span = button.children[0].innerText;
        const count = parseInt(span) + 1;
        button.children[0].innerText = count;
      })
      .catch((err) => alert(err))
    })
  }

  addDeleteListener(button, ul, li) {
    button.addEventListener('click', () => {
      fetch(`http://localhost:3000/quotes/${this.id}`, { 
        method: 'DELETE'
      })
      .then(() => {ul.removeChild(li)})
      .catch((err) => alert(err));
    })
  }
}