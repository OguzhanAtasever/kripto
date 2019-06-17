import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';
import { Link } from 'react-router-dom';
import history from '../history';

class TransactionPool extends Component{
    state = { transactionPoolMap: {}};


    fetchTransactionPoolMap = () =>{
        fetch('http://localhost:3000/api/transaction-pool-map')
        .then(response => response.json())
        .then(json => this.setState({transactionPoolMap: json}));
    }

    fetchMineTransactions = () => {
        fetch(`${document.location.origin}/api/mine-transactions`)
            .then(response => {
                if( response.status === 200){
                    alert('success');
                    history.push('/blocks');
                }else {
                    alert('Thi mine-transactions block request did not complete.');
                }
            })
    }

    componentDidMount() {
        this.fetchTransactionPoolMap();
    }

    render() {
        return (
            <div className='TransactionPool'>
                <div><Link to='/'>Home</Link></div>
                <h3>Transaction Pool</h3>
                {
                    Object.values(this.state.transactionPoolMap).map(transaction => {
                        return (
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        )
                    })
                }
                <hr />
                <Button 
                    bsStyle="danger"
                    onClick={this.fetchMineTransactions}
                > 
                Mine the Transactions
                </Button>
            </div>
        )
    }

}

export default TransactionPool;