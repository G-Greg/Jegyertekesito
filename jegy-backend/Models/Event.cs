namespace jegy_backend.Models
{
    public class Event
    {

        public long Id { get; set; }
        public int? TicketId { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public string? EventStart { get; set; }
        public string? EventEnd { get; set; }
        public string? About { get; set; }
        public string? ImgSource { get; set; }
    }
}
