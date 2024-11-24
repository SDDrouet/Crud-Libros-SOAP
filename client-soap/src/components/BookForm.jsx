import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    Id: 0,
    Titulo: '',
    Autor: '',
    Año: new Date().getFullYear(),
    resumen: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        Id: initialData.id || 0,
        Titulo: initialData.nombre || '',
        Autor: initialData.autor || '',
        Año: initialData.anio || new Date().getFullYear(),
        resumen: initialData.resumen || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Año' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        Id: 0,
        Titulo: '',
        Autor: '',
        Año: new Date().getFullYear(),
        resumen: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <input type="hidden" name="Id" value={formData.Id} />
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Título</label>
        <input
          type="text"
          name="Titulo"
          value={formData.Titulo}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Autor</label>
        <input
          type="text"
          name="Autor"
          value={formData.Autor}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Año</label>
        <input
          type="number"
          name="Año"
          value={formData.Año}
          onChange={handleChange}
          min="1900"
          max={new Date().getFullYear()}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Resumen</label>
        <input
          type="text"
          name="resumen"
          value={formData.resumen}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button 
        type="submit" 
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {initialData ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  );
};

export default BookForm;