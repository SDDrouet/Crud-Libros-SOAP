namespace backend_soap
{
    using backend_soap.Data;
    using backend_soap.Services;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.DependencyInjection;
    using SoapCore;

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSoapCore();
            services.AddScoped<ILibroService, LibroService>();
            services.AddDbContext<LibraryContext>();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", builder =>
                {
                    builder.WithOrigins("http://localhost:3000") // URL de tu aplicación React
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseRouting();
            app.UseCors("AllowReactApp"); // Aplicar la política

            app.UseEndpoints(endpoints =>
            {
                endpoints.UseSoapEndpoint<ILibroService>("/ServicioLibro.svc", new SoapEncoderOptions(), SoapSerializer.DataContractSerializer);
            });
        }
    }
}
