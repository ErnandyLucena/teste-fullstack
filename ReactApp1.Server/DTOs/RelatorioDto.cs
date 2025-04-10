namespace GestaoHospitalar.DTOs
{
    public class RelatorioUsoDto
    {
        public Dictionary<string, int> QuantidadePorTipo { get; set; }
        public double MediaPorBeneficiarioAtivo { get; set; }
        public int BeneficiariosSemAtendimento12Meses { get; set; }
    }
}
