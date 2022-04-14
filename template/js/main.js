
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
const input = document.getElementById('barcode').value

if(input.length !== 12) {
  alert(`Please ensure that barcode is 12 characters`)
  return
} 
  
const url = `https://world.openfoodfacts.org/api/v0/product/${input}.json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
    if (data.status === 1) {
       //call additional stuff 
    } else if (data.status === 0) {
      alert(`Product ${input} not found. Please try another.`)
    }
   
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}