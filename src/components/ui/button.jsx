export function Button({ className = '', ...props }) {
  return <button className={`inline-flex items-center justify-center px-4 py-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${className}`} {...props} />;
}
