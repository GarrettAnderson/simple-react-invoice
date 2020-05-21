import React, { Component } from 'react';

class LineItem extends Component {
  render() {
    return (
        <div className="lineItem">
            <div>{this.props.index + 1}</div>
            <div>{this.props.name ? this.props.name : 'Item Name'}</div>
            <div>{this.props.details ? this.props.details : 'No Details'} </div>
            <input name="quantity" type="number" value={this.props.quantity} step="1" onChange={this.props.calcItemQuantity}></input>
            <div>{this.props.price ? this.props.price : 0}</div>
            <div>{this.props.currencyFormatter(this.props.quantity * this.props.price)}</div>
        </div>
    );
  }
}

export default LineItem;