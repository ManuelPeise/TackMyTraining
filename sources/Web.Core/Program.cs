using Web.Core.Bundels;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

AppConfiguration.ConfigureServices(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
AppConfiguration.ConfigureApp(app);
