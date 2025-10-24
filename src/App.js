import React, { useState, useMemo, useEffect } from 'react';
import { Search, Plus, User, Mail, Phone, Trash2, Edit2, X, Check } from 'lucide-react';

// Mock API data
const INITIAL_CONTACTS = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@email.com', phone: '+1 (555) 123-4567', company: 'Tech Corp' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@email.com', phone: '+1 (555) 234-5678', company: 'Design Studio' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@email.com', phone: '+1 (555) 345-6789', company: 'Marketing Inc' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@email.com', phone: '+1 (555) 456-7890', company: 'Finance Group' },
  { id: 5, name: 'Edward Norton', email: 'ed.norton@email.com', phone: '+1 (555) 567-8901', company: 'Consulting LLC' },
  { id: 6, name: 'Fiona Green', email: 'fiona.g@email.com', phone: '+1 (555) 678-9012', company: 'Healthcare Plus' },
  { id: 7, name: 'George Wilson', email: 'george.w@email.com', phone: '+1 (555) 789-0123', company: 'Retail Co' },
  { id: 8, name: 'Hannah Lee', email: 'hannah.lee@email.com', phone: '+1 (555) 890-1234', company: 'Education Hub' },
];

// Header Component
function Header({ onAddClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-icon">
              <User size={24} color="white" />
            </div>
            <div>
              <h1 className="header-title">Contact Manager</h1>
              <p className="header-subtitle">Manage your contacts efficiently</p>
            </div>
          </div>
          <button onClick={onAddClick} className="btn-primary">
            <Plus size={20} />
            <span>Add Contact</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// Search Bar Component
function SearchBar({ searchQuery, onSearchChange, resultCount }) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search contacts by name, email, or company..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      {searchQuery && (
        <p className="search-results">
          Found {resultCount} contact{resultCount !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}

// Contact Card Component
function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      <div className="contact-header">
        <div className="contact-info">
          <div className="contact-avatar">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="contact-name">{contact.name}</h3>
            <p className="contact-company">{contact.company}</p>
          </div>
        </div>
      </div>

      <div className="contact-details">
        <div className="contact-detail-item">
          <Mail size={16} className="detail-icon" />
          <span className="detail-text">{contact.email}</span>
        </div>
        <div className="contact-detail-item">
          <Phone size={16} className="detail-icon" />
          <span className="detail-text">{contact.phone}</span>
        </div>
      </div>

      <div className="contact-actions">
        <button onClick={() => onEdit(contact)} className="btn-edit">
          <Edit2 size={16} />
          <span>Edit</span>
        </button>
        <button onClick={() => onDelete(contact.id)} className="btn-delete">
          <Trash2 size={16} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState({ hasSearch, onAddClick }) {
  return (
    <div className="empty-state">
      <User size={64} className="empty-icon" />
      <h3 className="empty-title">
        {hasSearch ? 'No contacts found' : 'No contacts yet'}
      </h3>
      <p className="empty-subtitle">
        {hasSearch
          ? 'Try adjusting your search terms'
          : 'Get started by adding your first contact'}
      </p>
      {!hasSearch && (
        <button onClick={onAddClick} className="btn-primary">
          <Plus size={20} />
          <span>Add Your First Contact</span>
        </button>
      )}
    </div>
  );
}

// Contact Form Modal Component
function ContactModal({ isOpen, contact, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company
      });
    } else {
      setFormData({ name: '', email: '', phone: '', company: '' });
    }
    setErrors({});
  }, [contact, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ name: '', email: '', phone: '', company: '' });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {contact ? 'Edit Contact' : 'Add New Contact'}
          </h2>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="John Doe"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`form-input ${errors.phone ? 'input-error' : ''}`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="form-input"
              placeholder="Acme Inc"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary">
            <Check size={20} />
            <span>{contact ? 'Update' : 'Add'} Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  // Inject styles
  useEffect(() => {
    const styleId = 'contact-app-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; }
        .app { min-height: 100vh; background: linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #faf5ff 100%); }
        .header { background: white; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border-bottom: 1px solid #e5e7eb; }
        .header-container { max-width: 1280px; margin: 0 auto; padding: 1.5rem 2rem; }
        .header-content { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .header-left { display: flex; align-items: center; gap: 0.75rem; }
        .logo-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #3b82f6, #9333ea); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .header-title { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.25rem; }
        .header-subtitle { font-size: 0.875rem; color: #6b7280; }
        .btn-primary { display: flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #3b82f6, #9333ea); color: white; padding: 0.625rem 1rem; border: none; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2); }
        .btn-primary:hover { background: linear-gradient(135deg, #2563eb, #7c3aed); box-shadow: 0 6px 12px rgba(59, 130, 246, 0.3); transform: translateY(-1px); }
        .btn-secondary { padding: 0.5rem 1rem; background: #f3f4f6; color: #374151; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .btn-secondary:hover { background: #e5e7eb; }
        .btn-edit, .btn-delete { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border: none; border-radius: 8px; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .btn-edit { background: transparent; color: #3b82f6; }
        .btn-edit:hover { background: #eff6ff; }
        .btn-delete { background: transparent; color: #ef4444; }
        .btn-delete:hover { background: #fef2f2; }
        .main-content { max-width: 1280px; margin: 0 auto; padding: 2rem; }
        .search-container { margin-bottom: 2rem; }
        .search-wrapper { position: relative; max-width: 672px; }
        .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .search-input { width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
        .search-input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
        .search-results { margin-top: 0.5rem; font-size: 0.875rem; color: #4b5563; }
        .loading-container { display: flex; justify-content: center; align-items: center; padding: 5rem 0; }
        .spinner { width: 48px; height: 48px; border: 3px solid #e5e7eb; border-top-color: #3b82f6; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .empty-state { text-align: center; padding: 5rem 0; }
        .empty-icon { color: #d1d5db; margin: 0 auto 1rem; }
        .empty-title { font-size: 1.25rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem; }
        .empty-subtitle { color: #6b7280; margin-bottom: 1.5rem; }
        .contacts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .contact-card { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); border: 1px solid #f3f4f6; padding: 1.5rem; transition: box-shadow 0.3s ease; }
        .contact-card:hover { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .contact-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem; }
        .contact-info { display: flex; align-items: center; gap: 0.75rem; }
        .contact-avatar { width: 48px; height: 48px; background: linear-gradient(135deg, #60a5fa, #a78bfa); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.125rem; }
        .contact-name { font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.25rem; }
        .contact-company { font-size: 0.875rem; color: #6b7280; }
        .contact-details { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
        .contact-detail-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem; }
        .detail-icon { color: #9ca3af; flex-shrink: 0; }
        .detail-text { color: #374151; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .contact-actions { display: flex; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid #f3f4f6; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; padding: 1rem; z-index: 50; }
        .modal-content { background: white; border-radius: 12px; box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15); width: 100%; max-width: 448px; max-height: 90vh; overflow-y: auto; }
        .modal-header { position: sticky; top: 0; background: white; border-bottom: 1px solid #e5e7eb; padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; }
        .modal-title { font-size: 1.25rem; font-weight: 600; color: #111827; }
        .modal-close { background: none; border: none; color: #9ca3af; cursor: pointer; padding: 0; transition: color 0.2s; }
        .modal-close:hover { color: #4b5563; }
        .modal-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; }
        .form-label { font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem; }
        .form-input { width: 100%; padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; transition: all 0.2s; }
        .form-input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
        .input-error { border-color: #ef4444; }
        .input-error:focus { border-color: #ef4444; box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1); }
        .error-text { margin-top: 0.25rem; font-size: 0.875rem; color: #ef4444; }
        .modal-footer { position: sticky; bottom: 0; background: #f9fafb; padding: 1.5rem; border-top: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; }
        @media (max-width: 768px) {
          .header-container { padding: 1rem; }
          .main-content { padding: 1rem; }
          .contacts-grid { grid-template-columns: 1fr; }
          .header-content { flex-direction: column; align-items: stretch; }
          .btn-primary { width: 100%; justify-content: center; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setContacts(INITIAL_CONTACTS);
      setIsLoading(false);
    };

    fetchContacts();
  }, []);

  const filteredContacts = useMemo(() => {
    if (!searchQuery.trim()) return contacts;
    
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.company.toLowerCase().includes(query)
    );
  }, [contacts, searchQuery]);

  const handleAddContact = (formData) => {
    const newContact = {
      id: Math.max(...contacts.map(c => c.id), 0) + 1,
      ...formData
    };
    setContacts([newContact, ...contacts]);
    setShowModal(false);
  };

  const handleEditContact = (formData) => {
    setContacts(contacts.map(contact =>
      contact.id === editingContact.id ? { ...contact, ...formData } : contact
    ));
    setEditingContact(null);
    setShowModal(false);
  };

  const handleDeleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const openEditModal = (contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingContact(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingContact(null);
  };

  return (
    <div className="app">
      <Header onAddClick={openAddModal} />

      <main className="main-content">
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredContacts.length}
        />

        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <EmptyState hasSearch={!!searchQuery} onAddClick={openAddModal} />
        ) : (
          <div className="contacts-grid">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onEdit={openEditModal}
                onDelete={handleDeleteContact}
              />
            ))}
          </div>
        )}
      </main>

      <ContactModal
        isOpen={showModal}
        contact={editingContact}
        onClose={closeModal}
        onSubmit={editingContact ? handleEditContact : handleAddContact}
      />
    </div>
  );
}

export default App;