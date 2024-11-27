import React, { useState } from "react";

const Form = ({ initialData, fields, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium">{field.label}</label>
          <input
            type={field.type || "text"}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder={field.placeholder || ""}
          />
        </div>
      ))}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default Form;
