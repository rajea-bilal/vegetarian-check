
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
       item.listBrand()
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
      this.brand = productData.brands
    }

    showInfo() {
        document.getElementById('product-img').src = this.image
        document.getElementById('product-name').innerText = this.name
    }
    listBrand() {
        document.getElementById('brand-name').innerText = this.brand
    }

    listIngredients() {
        let tableRef = document.getElementById('ingredient-table')

        for(let i = 1; i < tableRef.rows.length;) {
            tableRef.deleteRow(i);
        }
        
        if(!(this.ingredients == null)) {

            for(let key in this.ingredients) {
                let newRow = tableRef.insertRow(-1)
                let newICell = newRow.insertCell(0)
                let newVCell = newRow.insertCell(1)
                let newVgCell = newRow.insertCell(2)
               
               
                let veganStatus = this.ingredients[key].vegan == null ? 'unknown' : this.ingredients[key].vegan
                let vegStatus = this.ingredients[key].vegetarian == null ? 'unknown' : this.ingredients[key].vegetarian
    
                let newIText = document.createTextNode(this.ingredients[key].text)
                let newVText = document.createTextNode(vegStatus)
                let newVgText = document.createTextNode(veganStatus)
    
                newICell.appendChild(newIText) 
                // putting ingredient text in the ingredient cell
                newVCell.appendChild(newVText)
                 // putting vegetarian text in the vegetarian cell
                newVgCell.appendChild(newVgText)
                 // putting vegan text in the vegan cell
            }

        }
        
       
    }
   
}


        
       



// 011110038364
// 041196910759