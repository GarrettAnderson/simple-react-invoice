import React, { Component } from 'react';
import LineItem from './LineItem'
import styles from './SelectedLineItems.scss'

class LineItems extends Component {
  render() {
    return (
     <form>
        <div className="line-items">
          <div className="grid-table">
            <div className="row header">
              <div>#</div>
              <div>Item Name</div>
              <div>Details</div>
              <div>Qty</div>
              <div>Price</div>
              <div>Total</div>
              <div>Delete Item</div>
            </div>
            <div className="selected-item">{this.props.items.map((item, i) => 
                (
                 <LineItem 
                  key={item.id} 
                  item={item.id} 
                  index={i} 
                  name={item.item} 
                  details={item.details}
                  price={item.price} 
                  quantity={item.quantity} 
                  updateItemQuantity={this.props.updateQuantity(i)} 
                  currencyFormatter={this.props.currencyFormat} 
                  removeItem={this.props.removeLineItem}
                  />
            ))}
            </div>
          </div>
        </div>
     </form>
    );
  }
}

export default LineItems;