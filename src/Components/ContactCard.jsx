export default function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="p-4 shadow rounded bg-white">
      <h3 className="text-lg font-bold">{contact.name}</h3>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={onEdit} className="text-blue-500">Edit</button>
        <button onClick={() => onDelete(contact.id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
}
