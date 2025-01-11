import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
    return (
        <div className="mt-4 p-4 bg-red-500 text-white rounded">
            <p>{message}</p>
        </div>
    );
};

ErrorMessage.propTypes = {
    message: PropTypes.string,
};

export default ErrorMessage;
