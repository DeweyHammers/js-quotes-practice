const handleForm = () => {
  const form = document.querySelector('#new-quote-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.querySelectorAll('input')
    const newQuote = input[0]
    const author =  input[1]
    createNewQuote(newQuote, author)
    newQuote.value = '';
    author.value = '';
  });
}

const createNewQuote = (newQuote, author) => {
  fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      quote: newQuote.value,
      author: author.value
    })
  })
  .then(response => response.json())
  .then(json => {
    fetch(`http://localhost:3000/quotes/${json.id}?_embed=likes`)
    .then(response => response.json())
    .then(json => {
      const quote = new Quote(json);
      quote.createAndRenderHtml();
    })
  })
  .catch((err) => console.error(err));
}