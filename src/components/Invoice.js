import React, { Component } from 'react'
import styles from './Invoice.scss'
import axios from 'axios'
import LineItems from './LineItems'


class Invoice extends Component {
  
  locale = 'en-US'
  currency = 'USD'

  state = {
    lineItems: [],
    selectedItems: []
    }
  }
 

  componentDidMount() {
    const AuthStr =
      'Bearer ' +
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXJjaGFudCI6IjZkMzI5Nzk3LWI2NGQtNDdkMS1hNDU3LTQ3OThlMmIzNjFiNSIsImdvZFVzZXIiOmZhbHNlLCJzdWIiOiI0ODI3ODAzNi1jYzE5LTQ3YWItYTgyOC03MzRiOWUxYWNlMDIiLCJpc3MiOiJodHRwOi8vYXBpZGVtby5mYXR0bGFicy5jb20vdGVhbS9hcGlrZXkiLCJpYXQiOjE1NTU0Mjg2MzMsImV4cCI6NDcwOTAyODYzMywibmJmIjoxNTU1NDI4NjMzLCJqdGkiOiJxZTNueklKdWlDOFhKN1dhIiwiYXNzdW1pbmciOmZhbHNlfQ.TEmlwmgVBLwt5x0FO4c-mbY3JgO_tgxcFRfznlOGSrM'
    axios.get('https://apidemo.fattlabs.com/item', { headers: { Authorization: AuthStr } }).then((resp) => {
      console.log(resp.data.data)
      // this.setState({
      //   lineItems: resp.data.data
      // })
      let newQuantity = resp.data.data.map((quantity, i) => {
        return {...quantity, quantity: 1}
      })
      console.log(newQuantity)
      this.setState({lineItems: newQuantity})
    })
  }

  selectItem = (event) => {
    console.log(event)
    let selectedItem = this.state.lineItems[parseInt(event.target.value)]
    console.log(selectedItem)
    let newList = this.state.selectedItems.concat(selectedItem)
    console.log(newList)
    this.setState({selectedItems: Array.from(newList)})
  }

  formatCurrency = (amount) => {
    return (new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount))
  }

  calcQuantity = (elementIndex) => (event) => {
    console.log('updated the quantity amount')
    let updatedQuantity = this.state.selectedItems.map((item, i) => {
      console.log(item)
      return (elementIndex === i) ? {...item, quantity: event.target.value} : item
    })
    console.log(updatedQuantity)
    this.setState({selectedItems: updatedQuantity})
  }

  calcSelectedItemsTotal = () => {
    console.log(this.state.selectedItems)
    const totalAmount = this.state.selectedItems
    .reduce((prev, cur) => {
      console.log(prev)
      console.log(cur)
      if (!cur.quantity) {
        console.log(prev)
        return (prev + cur.price)
      } else {
        return (prev + (cur.quantity * cur.price))
      }
    },0)
    return totalAmount
  }

  handleRemoveLineItem = (elementIndex) => {
    console.log('delete button clicked')
    // this.setState({
    //   selectedItems: this.state.selectedItems.filter((item, i) => {
    //     return elementIndex !== i
    //   })
    // })
  }
 

  handleChange = (event) => {
    console.log(event.target.value)
    // this.setState({
    //   total: input
    // })
  }

  submit = () => {
    const selectedItemsData = this.state.selectedItems.map((item, i) => ({item}))
    console.log(selectedItemsData)

    // let data = this.state.userData
    let data = {
      'meta': {
        'lineItems': [
          {
            'id': this.state.selectedItems[0].id,
            'item': this.state.selectedItems[0].item,
            'details': this.state.selectedItems.details,
            'quantity': this.state.selectedItems.quantity,
            'price': this.state.selectedItems.price
          }
        ]
      },
      'total': this.calcSelectedItemsTotal(),
      'url': 'https://omni.fattmerchant.com/#/bill/'
    }

    console.log(data)
    console.log('submit button clicked')
    const AuthStr =
    'Bearer ' +
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXJjaGFudCI6IjZkMzI5Nzk3LWI2NGQtNDdkMS1hNDU3LTQ3OThlMmIzNjFiNSIsImdvZFVzZXIiOmZhbHNlLCJzdWIiOiI0ODI3ODAzNi1jYzE5LTQ3YWItYTgyOC03MzRiOWUxYWNlMDIiLCJpc3MiOiJodHRwOi8vYXBpZGVtby5mYXR0bGFicy5jb20vdGVhbS9hcGlrZXkiLCJpYXQiOjE1NTU0Mjg2MzMsImV4cCI6NDcwOTAyODYzMywibmJmIjoxNTU1NDI4NjMzLCJqdGkiOiJxZTNueklKdWlDOFhKN1dhIiwiYXNzdW1pbmciOmZhbHNlfQ.TEmlwmgVBLwt5x0FO4c-mbY3JgO_tgxcFRfznlOGSrM'
    
    const headers = {
     'Content-Type': 'application/json',
     'Authorization': AuthStr,
     'Accept': 'application/json'
    }
    
    axios.post('https://apidemo.fattlabs.com/invoice', data, {
      headers: headers
    })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log('Axios Error: ', err)
    })
  }

  render() {
    return (
      <div className="invoice">
        <div className="memo">
          <h2>Memo:</h2>
          <textarea name="memo-text" col="50" row="5" />
        </div>
        <div className="item-choice">
          <select className="line-items" onChange={this.selectItem}>
            {this.state.lineItems.map((item, index) => <option key={item.id} value={index}>{item.item}</option>)}
          </select>
        </div>
          
        <h2>Invoice</h2>  
          <LineItems 
            items={this.state.selectedItems} 
            currencyFormat={this.formatCurrency} 
            updateQuantity={this.calcQuantity}
            removeLineItem={this.handleRemoveLineItem}
            />
          
          <div className="total-container">
            <div className="value-table">
              <div className="row">
                <label className="label">Total</label>
                <div>
                 <input readOnly className="total-amount" value={this.formatCurrency(this.calcSelectedItemsTotal())}></input>
                </div>
              </div>
            </div>
          </div>

          <div className="pay">
            <button className="pay-now" onClick={this.submit}>Pay Now</button>
          </div>

      </div>
    )
  }
}

export default Invoice
