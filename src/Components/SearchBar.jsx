export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search contacts..."
      className="border p-2 rounded w-full"
    />
  );
}
export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search contacts..."
      className="border p-2 rounded w-full"
    />
  );
}
