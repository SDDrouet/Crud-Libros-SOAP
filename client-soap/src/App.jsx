import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import libroService from './services/soapService';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await libroService.getAllLibros();
      setBooks(data);
    } catch (error) {
      showNotification('No se pudieron cargar los libros', 'error');
      console.error('Error al cargar libros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSubmit = async (bookData) => {
    try {
      console.log('bookData:', bookData);
      setLoading(true);
      if (bookData.Id) {
        await libroService.updateLibro(bookData);
        showNotification('Libro actualizado correctamente');
      } else {
        await libroService.addLibro(bookData);
        showNotification('Libro agregado correctamente');
      }
      setEditingBook(null);
      loadBooks();
    } catch (error) {
      showNotification(
        bookData.Id 
          ? 'Error al actualizar el libro'
          : 'Error al agregar el libro',
        'error'
      );
      console.error('Error al guardar libro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este libro?')) {
      try {
        setLoading(true);
        await libroService.deleteLibro(id);
        showNotification('Libro eliminado correctamente');
        loadBooks();
      } catch (error) {
        showNotification('Error al eliminar el libro', 'error');
        console.error('Error al eliminar libro:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <div 
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg ${
            notification.type === 'error' 
              ? 'bg-red-500 text-white' 
              : 'bg-green-500 text-white'
          }`}
        >
          {notification.message}
        </div>
      )}

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Sistema de Gestión de Libros
            </h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              Cargando...
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">
              {editingBook ? 'Editar Libro' : 'Agregar Nuevo Libro'}
            </h2>
            <BookForm
              onSubmit={handleSubmit}
              initialData={editingBook}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Lista de Libros</h2>
            <BookList
              books={books}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {!loading && books.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No hay libros registrados
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;