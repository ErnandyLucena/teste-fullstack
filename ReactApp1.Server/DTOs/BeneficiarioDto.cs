namespace GestaoHospitalar.DTOs 
{
    public class BeneficiarioDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool Ativo { get; set; }
    }
}
