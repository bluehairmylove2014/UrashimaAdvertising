namespace Back_end.Models
{
    public class AdsBoard
    {
        public int Id { get; set; }
        public string AdsType { get; set; }
        public int Size { get; set; }
        public string Image { get; set; }
        public DateTime ExpiredDate { get; set; }
    }
}
