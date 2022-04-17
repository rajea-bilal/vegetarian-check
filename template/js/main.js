
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
const input = document.getElementById('barcode').value

if(input.length !== 12) {
  alert(`Please ensure that barcode is 12 characters`)
  return
} 
  
const url = `https://world.openfoodfacts.org/api/v0/product/${input}.json`

  fetch(url)
    //we're going to the URL
      .then(res => res.json()) // whatever result is coming from that URL we're parsing that as JSON
      .then(data => {
    // use that JSON data
        console.log(data)
    if (data.status === 1) { 
    // status is a specific property in the object and it determines whether or not the product was found in the database. If that's 1, we go ahead and call our constructor, build our product, and then we call that method of showInfo on the product
    
       const item = new ProductInfo(data.product) 
       item.showInfo()
       item.listIngredients()
    } else if (data.status === 0) {
      alert(`Product ${input} not found. Please try another.`)
    }
   
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

class ProductInfo {
    constructor(productData) { 
      // I am passing in data.product
      this.name = productData.product_name
      this.ingredients = productData.ingredients
      this.image = productData.image_url
    }

    showInfo() {
        document.getElementById('product-img').src = this.image
        document.getElementById('product-name').innerText = this.name
    }

    listIngredients() {
        let tableRef = document.getElementById('ingredient-table')
        
        for(let key in this.ingredients) {
            let newRow = tableRef.insertRow(-1)
            let newICell = newRow.insertCell(0)
            let newVCell = newRow.insertCell(1)
            let newIText = document.createTextNode(this.ingredients[key].text)

            let vegStatus = this.ingredients[key].vegetarian
            let newVText = document.createTextNode(vegStatus)
            newICell.appendChild(newIText) 
            // putting ingredient text in the ingredient cell
            newVCell.appendChild(newVText)
             // putting vegetarian text in the vegetarian cell
        }
 
       

    }

  }

// 011110038364
// 041196910759