using System;

namespace GC.Domain.Records.Novelties
{
    public class Novelty
    {
        public Guid Id { get; }
        public String Title { get; }
        public String Description { get; }
        public DateTime? PublishDate { get; }
        public String? Image { get; }

        public Novelty(Guid id, String title, String description, DateTime? publishDate, String? image)
        {
            Id = id;
            Title = title;
            Description = description;
            PublishDate = publishDate;
            Image = image;
        }
    }
}
