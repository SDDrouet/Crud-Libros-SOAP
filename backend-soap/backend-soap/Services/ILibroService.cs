namespace backend_soap.Services
{
    using System.ServiceModel;
    using backend_soap.Entity;

    [ServiceContract]
    public interface ILibroService
    {
        [OperationContract]
        List<Libro> GetAllLibros();

        [OperationContract]
        Libro GetLibroById(int id);

        [OperationContract]
        void AddLibro(Libro libro);

        [OperationContract]
        void UpdateLibro(Libro libro);

        [OperationContract]
        void DeleteLibro(int id);
    }
}
