using System;

namespace GC.Domain.Records.Novelties
{
    public class NoveltyBlank
    {
        public Guid? Id { get; set; }
        public String? Title { get; set; }
        public String? Description { get; set; }
        public DateTime? PublishDate { get; set; }
        public String? Image { get; set; }
    }
}
