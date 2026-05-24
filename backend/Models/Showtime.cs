namespace backend.Models;

public class Showtime
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public string TheatreName { get; set; } = "";
    public string Auditorium { get; set; } = "";
    public DateTime StartTime { get; set; }
    public decimal TicketPrice { get; set; }
}