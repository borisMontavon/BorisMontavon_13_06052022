import PropTypes from "prop-types";

interface AccountSectionProps {
    accountTitle: string;
    accountAmount: string;
    accountAmountDescription: string;
}

export function AccountSection({accountTitle, accountAmount, accountAmountDescription}:AccountSectionProps) {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{accountTitle}</h3>
                <p className="account-amount">{accountAmount}</p>
                <p className="account-amount-description">{accountAmountDescription}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
            </div>
        </section>
    );
}

AccountSection.propTypes = {
    accountTitle: PropTypes.string.isRequired,
    accountAmount: PropTypes.string.isRequired,
    accountAmountDescription: PropTypes.string.isRequired
}
