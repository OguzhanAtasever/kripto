import React from 'react';

const Transaction = ({transaction}) => {


    const {input, outputMap} = transaction;
    const recipents = Object.keys(outputMap); 

    return (
        <div className='Transaction'>
            <div> From : {`${input.address.substring(0,20)}...`} | Balance: {input.amount} </div>
            {
                recipents.map(recipent =>  (
                        <div key = {recipent}>
                            To: {`${recipent.substring(0,20)}...`} | Sent: {outputMap[recipent]}
                        </div>
                    )
                )
            }
        </div>
    );
}

export default Transaction; 