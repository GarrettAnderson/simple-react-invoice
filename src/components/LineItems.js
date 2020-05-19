import React, { Component } from 'react';
import LineItem from './LineItem'

class LineItems extends Component {
  render() {
    return (
     <form>
        <div className="lineItems">
          <div className="gridTable">
            <div className="row header">
              <div>#</div>
              <div>Item Name</div>
              <div>Details</div>
              <div>Qty</div>
              <div>Price</div>
              <div>Amount</div>
            </div>
            <div className="selected-item">{this.props.items.map((item, i) => 
                (<LineItem item={item.id} index={i} name={item.item} details={item.details} price={item.price} quantity={item.quantity} calcItemQuantity={this.props.updateQuantity} currencyFormatter={this.props.currencyFormat}/>
            ))}
          </div>

          </div>
        </div>

     </form>
    );
  }
}

export default LineItems;