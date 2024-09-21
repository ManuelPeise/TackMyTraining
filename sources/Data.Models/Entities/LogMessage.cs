namespace Data.Models.Entities
{
    public class LogMessage: AEntityBase
    {
        public string Trigger { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string ExceptionJson { get; set; } = string.Empty;
        public DateTime TimeStamp { get; set; }
    }
}
