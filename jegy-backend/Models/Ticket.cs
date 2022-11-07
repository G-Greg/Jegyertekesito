namespace jegy_backend.Models
{
    public class Ticket
    {
        public long Id { get; set; }
        public int? EventId { get; set; }
        public int? EarlyBird { get; set; }
        public int? LastMinute { get; set; }
        public int? Normal { get; set; }
        public int? VIP { get; set; }
        public int? EarlyBirdPrice { get; set; }
        public int? LastMinutePrice { get; set; }
        public int? NormalPrice { get; set; }
        public int? VIPPrice { get; set; }
    }
}
