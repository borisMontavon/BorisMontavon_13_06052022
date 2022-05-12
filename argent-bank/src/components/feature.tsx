import PropTypes from "prop-types";

interface FeatureProps {
    icon: string;
    alt: string;
    title: string;
    message: string;
}

export function Feature({icon, alt, title, message}:FeatureProps) {
    return (
        <div className="feature-item">
            <img
                src={icon}
                alt={alt}
                className="feature-icon"
            />
            <h3 className="feature-item-title">{title}</h3>
            <p>
                {message}
            </p>
        </div>
    );
}

Feature.propTypes = {
    icon: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}
