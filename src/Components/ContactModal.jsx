export default function ContactModal({ contact, onSave, onClose }) {
  const [formData, setFormData] = useState(contact || { name: "", email: "", phone: "" });

  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <input
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="border p-2 mb-2 w-full"
        />
        <input
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="border p-2 mb-2 w-full"
        />
        <input
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Phone"
          className="border p-2 mb-2 w-full"
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
