type Props = { message?: string };
const ErrorMessage: React.FC<Props> = ({ message }) => (
  <p style={{ color: 'red' }}>{message ?? 'An error occurred.'}</p>
);
export default ErrorMessage;
