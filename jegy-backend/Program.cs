using Microsoft.EntityFrameworkCore;
using jegy_backend.Contexts;

//var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://localhost:7211", "https://localhost:4200", "http://localhost:4200").AllowAnyHeader().AllowAnyMethod();

        });
});

builder.Services.AddControllers();

builder.Services.AddDbContext<UserContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("Jegyertekesito")));

builder.Services.AddDbContext<EventContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("Jegyertekesito")));

/*builder.Services.AddScoped<UserContext>();*/


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();
