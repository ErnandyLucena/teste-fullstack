using Microsoft.AspNetCore.Mvc;
using GestaoHospitalar.Services;
using GestaoHospitalar.DTOs;

namespace GestaoHospitalar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        private readonly RelatorioService _relatorioService;

        public RelatoriosController(RelatorioService relatorioService)
        {
            _relatorioService = relatorioService;
        }

        [HttpGet("uso")]
        public async Task<ActionResult<RelatorioUsoDto>> GetRelatorioUso()
        {
            var relatorio = await _relatorioService.GerarRelatorioUsoAsync();
            return Ok(relatorio);
        }
    }
}
