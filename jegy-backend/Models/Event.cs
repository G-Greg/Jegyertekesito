namespace jegy_backend.Models
{
    public class Event
    {

        public long Id { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public string? Category { get; set; }
        public string? EventStart { get; set; }
        public string? EventEnd { get; set; }
        public int? NumberOfTickets { get; set; }
        public string? About { get; set; }
    }
}
