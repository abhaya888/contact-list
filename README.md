# Contact Manager App

A simple **Contact Manager** web application built using **React** and **CSS**.  
This app allows you to **view, search, add, edit, and delete contacts** in a user-friendly interface.

---

## 🌐 Live Demo

[Deployed App on Vercel](https://contact-list-tau-ivory.vercel.app/)

---

## ⚡ Features

- View a list of contacts with **name, email, phone, and company**.  
- **Search contacts** by name, email, or company in real-time.  
- **Add new contacts** via a modal form.  
- **Edit existing contacts** using a modal form.  
- **Delete contacts** with a confirmation prompt.  
- Responsive layout using **CSS styling**.  
- User-friendly interface with **Lucide React icons**.

> **Note:** Changes (add/edit/delete) are **not persistent** after page refresh as the app uses in-memory state to mimic API interaction.

---

## 🛠 Technologies & Libraries

- **React** – Frontend framework  
- **CSS** – Styling for layout and responsiveness  
- **Lucide React** – Icons for buttons and visual elements  

---

## 💻 Getting Started (Local Setup)

1. Clone the repository:

```
git clone https://github.com/abhaya888/contact-list
cd contact-list
```

2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm start    
```

4. Open your browser and visit:

```
http://localhost:3000  
```

---

## 🎨 Design & Implementation Notes

- **Component Structure:** Currently, all logic is in `App.js`. Could be refactored into subcomponents (`ContactCard`, `Modal`, `SearchBar`) for cleaner code.  
- **Form Validation:** Simple validation for name, email, and phone fields.  
- **UX Considerations:**  
  - Empty state messages guide users to add their first contact.  
  - Loading spinner simulates API fetch delay.  
- **Assumptions:**  
  - Persistent storage is not required; data resets on page reload.  
  - Only basic form validation is implemented.

---

## 📌 How I Used the Libraries

- **CSS:** For styling and responsive layout.  
- **Lucide React:** Modern, lightweight icon library for buttons and inputs.  
- **React Hooks (`useState`, `useEffect`, `useMemo`)**: For state management and filtering/search optimization.

---

## ✅ Submission Notes

- The app is deployed and publicly accessible.  
- All core technical requirements of the assignment are met.  
- Enhancements like persistent storage or component refactoring can be added later.
