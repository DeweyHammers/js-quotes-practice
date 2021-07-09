const createQuotes = (json) => {
  const allQuotes = {}
  json.forEach(obj => {
    const quote = new Quote(obj);
    allQuotes[quote.id] = quote;
  });
  return allQuotes;
}

const renderQuotes = (allQuotes) => {
  for(const quote in allQuotes) {
    allQuotes[quote].createAndRenderHtml()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/quotes?_embed=likes')
  .then(response => response.json())
  .then(json => createQuotes(json))
  .then(allQuotes => renderQuotes(allQuotes))
  .then(() => handleForm())
  .catch(err => alert(err));
});