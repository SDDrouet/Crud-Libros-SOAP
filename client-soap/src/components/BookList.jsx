import React from 'react';

const BookList = ({ books, onEdit, onDelete }) => (
  <div className="p-4">
    {books.map((book) => (
      <div key={book.id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded">
        <div>
          <h2 className="font-bold">{book.nombre}</h2>
          <p>{book.autor}</p>
          <p className="text-sm text-gray-600">Año: {book.anio}</p>
          <p>Resumen: {book.resumen}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(book)} 
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Editar
          </button>
          <button 
            onClick={() => onDelete(book.id)} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default BookList;