import React, { Component } from 'react';
import { MdCancel as DeleteIcon } from 'react-icons/md';
import styles from './LineItem.scss'

class LineItem extends Component {
  render() {
    return (
        <div className="line-item">
            <div>{this.props.index + 1}</div>
            <div><input readOnly value={this.props.name ? this.props.name : 'Item Name'}></input></div>
            <div><input readOnly value={this.props.details ? this.props.details : 'No Details'}></input> </div>
            <div>
            <input name="quantity" type="number" value={this.props.quantity} step="1" onChange={this.props.calcItemQuantity}></input>
            </div>
            <div><input readOnly value={this.props.price ? this.props.price : 0}></input></div>
            <div><input readOnly value={this.props.currencyFormatter(this.props.quantity * this.props.price)}></input></div>
            <div>
              <button type="button" className="delete-item" onClick={this.props.removeItem}>
                <DeleteIcon size="1.25em"/>
              </button>
            </div>
        </div>
    );
  }
}

export default LineItem;