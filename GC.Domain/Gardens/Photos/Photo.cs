using System;

namespace GC.Domain.Gardens.Photos
{
    public class Photo
    {
        public Guid Id { get; }
        public String Path { get; }

        public Photo(Guid id, String path)
        {
            Id = id;
            Path = path;
        }
    }
}
