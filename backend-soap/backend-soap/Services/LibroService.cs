using backend_soap.Data;
using backend_soap.Entity;

namespace backend_soap.Services
{
    public class LibroService : ILibroService
    {
        private readonly LibraryContext _context;

        public LibroService()
        {
            _context = new LibraryContext();
        }

        public List<Libro> GetAllLibros()
        {
            return _context.Libros.ToList();
        }

        public Libro GetLibroById(int id)
        {
            return _context.Libros.Find(id);
        }

        public void AddLibro(Libro libro)
        {
            libro.Id = 0;
            _context.Libros.Add(libro);
            _context.SaveChanges();
        }

        public void UpdateLibro(Libro libro)
        {
            var existingLibro = _context.Libros.Find(libro.Id);
            if (existingLibro != null)
            {
                _context.Entry(existingLibro).CurrentValues.SetValues(libro);
                _context.SaveChanges();
            }
        }

        public void DeleteLibro(int id)
        {
            var libro = _context.Libros.Find(id);
            if (libro != null)
            {
                _context.Libros.Remove(libro);
                _context.SaveChanges();
            }
        }
    }
}
