using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using NLog.Web;
using project_API;
using project_API.Entities;
using project_API.Hub;
using project_API.Midddleware;
using project_API.Models;
using project_API.Models.Validators;
using project_API.Services;
using System.Text;


var builder = WebApplication.CreateBuilder(args);
var authenticationSettings = new authenticationSettings();
builder.Host.UseNLog();

builder.Services.AddScoped<errorHandlingMiddleware>();
builder.Services.AddSingleton(authenticationSettings);
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<dataBase>();
builder.Services.AddScoped<dataSeeder>();
builder.Services.AddScoped<IAccountService, accountService>();
builder.Services.AddScoped<IThreadService,ThreadService>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IValidator<userRegisterDto>, registerUserDtoValidator>();
builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);
builder.Services.AddCors();
builder.Services.AddSignalR();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Bearer";
    options.DefaultScheme = "Bearer";
    options.DefaultChallengeScheme = "Bearer";
}).AddCookie(c =>
{
    c.Cookie.Name = "token";
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authenticationSettings.JwtIssuer,
        ValidAudience = authenticationSettings.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey)),
    };
    cfg.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            context.Token = context.Request.Cookies["token"];
            return Task.CompletedTask;
        }
    };
});
var app = builder.Build();

var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
using (var scope = scopedFactory.CreateScope())
{
    var service=scope.ServiceProvider.GetService<dataSeeder>();
    service.Seed();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(x => x.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .SetIsOriginAllowed(origin => true)
                  .AllowCredentials());
app.MapHub<MessageHub>("hub/message");
app.UseMiddleware<errorHandlingMiddleware>();
app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

app.Run();
