using Microsoft.EntityFrameworkCore;
using GestaoHospitalar.Data;
using GestaoHospitalar.Services;
using GestaoHospitalar.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registro de dependências
builder.Services.AddScoped<BeneficiarioRepository>();
builder.Services.AddScoped<BeneficiarioService>();

builder.Services.AddScoped<AtendimentoRepository>();
builder.Services.AddScoped<AtendimentoService>();

// 👇 Adicionando RelatorioRepository e RelatorioService
builder.Services.AddScoped<RelatorioRepository>();
builder.Services.AddScoped<RelatorioService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
