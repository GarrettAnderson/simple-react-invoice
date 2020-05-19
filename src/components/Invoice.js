import React, { Component } from 'react'
import axios from 'axios'
import LineItems from './LineItems'
import LineItem from './LineItem'


class Invoice extends Component {
  
  locale = 'en-US'
  currency = 'USD'

  state = {
    lineItems: [],
    selectedItems: []
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
        return {...quantity, quantity: 0}
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

  calcQuantity = (event) => {
    console.log('updated the quantity amount')
    let updatedQuantity = this.state.selectedItems.map((quantity, i) => {
      console.log(quantity)
      return {...quantity, quantity: event.target.value}
    })
    console.log(updatedQuantity)
    this.setState({selectedItems: updatedQuantity})
  }

  calcSelectedItemsTotal = () => {
    console.log(this.state.selectedItems)
    // return this.state.selectedItems
    // .reduce((prev, cur) => {
    //   console.log(prev)
    //   console.log(cur)
    //   if (!cur.quantity) {
    //     console.log(prev)
    //     return (prev + cur.price)
    //   } else {
    //     return (prev + (cur.quantity * cur.price))
    //   }
    // },0)
  }

  submit = () => {
    console.log('submit button clicked')
  }

  render() {
    return (
      <div className="invoice">
        <div className="memo">
          <h3>Memo:</h3>
          <textarea name="memo-text" col="50" row="5" />
        </div>
        <div className="item-choice">
          <select className="line-items" onChange={this.selectItem}>
            {this.state.lineItems.map((item, index) => <option key={item.id} value={index}>{item.item}</option>)}
          </select>
          <LineItems items={this.state.selectedItems} currencyFormat={this.formatCurrency} updateQuantity={this.calcQuantity}/>
          <div className="total">
            <label>Total</label>
            <div>{this.formatCurrency(this.calcSelectedItemsTotal())}</div>
          </div>
          <button onClick={this.submit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default Invoice
