const ErrorHandler = (props) => {
    if (props.error) {
        return (
            <p className="container">{props.error.err.status} {props.error.err.msg}</p>
        )
    }
    return (
        <p className="container">Error. Bad Request</p>
    )
};
export default ErrorHandler;