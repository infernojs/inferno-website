import {Link} from 'inferno-router';

export default function() {
  return (
    <div className="text-xs-center p-3">
      <h1>Page not found</h1>

      <Link to="/">Go to Homepage</Link>
    </div>
  );
}
