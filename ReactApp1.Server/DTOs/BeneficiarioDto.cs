namespace SeuProjeto.DTOs // Troque "SeuProjeto" pelo nome do seu namespace principal
{
    public class BeneficiarioDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public bool Ativo { get; set; }
    }
}
