import PropTypes from "prop-types";

interface TransactionProps {
    transactionTitle: string;
    transactionAmount: string;
    transactionAmountDescription: string;
}

export function Transaction({transactionTitle, transactionAmount, transactionAmountDescription}:TransactionProps) {
    return (
        <div className="account-content-wrapper">
            <h3 className="account-title">{transactionTitle}</h3>
            <p className="account-amount">{transactionAmount}</p>
            <p className="account-amount-description">{transactionAmountDescription}</p>
        </div>
    );
}

Transaction.propTypes = {
    transactionTitle: PropTypes.string.isRequired,
    transactionAmount: PropTypes.string.isRequired,
    transactionAmountDescription: PropTypes.string.isRequired
}
