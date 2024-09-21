using BusinessLogic.Administration;
using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.TrainingContext;
using Microsoft.EntityFrameworkCore;

namespace Web.Core.Bundels
{
    public static class AppConfiguration
    {
        public static void ConfigureServices(WebApplicationBuilder builder)
        {
            builder.Services.AddControllers();

            // configure the db context
            builder.Services.AddDbContext<TrainingDbContext>(opt =>
            {
                var connection = builder.Configuration.GetConnectionString("TrainingContext") ?? null;

                if (connection == null)
                {
                    throw new Exception("Could not configure database context!");
                }

                opt.UseMySQL(connection);
            });

            builder.Services.AddScoped<IApplicationUnitOfWork, ApplicationUnitOfWork>();
            builder.Services.AddScoped<IUserRegistrationService, UserRegistrationService>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
        }

        public static void ConfigureApp(WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
