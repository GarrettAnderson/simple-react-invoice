import React, { Component } from 'react'
import axios from 'axios'


class Invoice extends Component {
  state = {
    lineItems: [],
    selectedItems: ['']
  }

  componentDidMount() {
    const AuthStr =
      'Bearer ' +
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXJjaGFudCI6IjZkMzI5Nzk3LWI2NGQtNDdkMS1hNDU3LTQ3OThlMmIzNjFiNSIsImdvZFVzZXIiOmZhbHNlLCJzdWIiOiI0ODI3ODAzNi1jYzE5LTQ3YWItYTgyOC03MzRiOWUxYWNlMDIiLCJpc3MiOiJodHRwOi8vYXBpZGVtby5mYXR0bGFicy5jb20vdGVhbS9hcGlrZXkiLCJpYXQiOjE1NTU0Mjg2MzMsImV4cCI6NDcwOTAyODYzMywibmJmIjoxNTU1NDI4NjMzLCJqdGkiOiJxZTNueklKdWlDOFhKN1dhIiwiYXNzdW1pbmciOmZhbHNlfQ.TEmlwmgVBLwt5x0FO4c-mbY3JgO_tgxcFRfznlOGSrM'
    axios.get('https://apidemo.fattlabs.com/item', { headers: { Authorization: AuthStr } }).then((resp) => {
      console.log(resp.data.data)
      this.setState({
        lineItems: resp.data.data
      })
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

  addItem = (item) => {
    console.log('item')
    this.setState(prevState => ({selectedItems: [...prevState.selectedItems, this.state.lineItems[item]]}))
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
          <div className="selected-item">{this.state.selectedItems.map((item, index) => 
            <div key={item.id} value={index}>{item.id}</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Invoice
