import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';

class ConductTransaction extends Component {
    state = { recipent: '', amount: 0};

    updateRecipent = event => {
        this.setState({recipent: event.target.value   })
    }

    updateAmount = event => {
        this.setState({ amount: Number(event.target.value)   })
    }

    conductTransaction = () => {
        const { recipent, amount } = this.state;

        fetch('http://localhost:3000/api/transact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ recipent, amount})
        }).then(response => response.json())
            .then(json => {
                alert(json.message || json.type);
                history.push('/transaction-pool');
            });
    }

    render () {
        console.log('this.state', this.state);
        return (
            <div>
                <Link to='/'>Home</Link>
                <h3>Conduct a Transaction</h3>
                <FormGroup>
                    <FormControl 
                        input='text'
                        placeholder ='recipent'
                        value={this.state.recipent}
                        onChange={this.updateRecipent}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl 
                        input='number'
                        placeholder ='amount'
                        value={this.state.amount}
                        onChange={this.updateAmount}
                    />
                </FormGroup>
                <div>
                    <Button 
                        bsStyle="danger"
                        onClick={this.conductTransaction}
                    >
                    Submit
                    </Button>
                </div>
            </div>
        )
    }
};

export default ConductTransaction;