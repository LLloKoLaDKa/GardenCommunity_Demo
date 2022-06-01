using GC.Domain.Gardens.Photos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Gardens.Converters
{
    public static class PhotosConverters
    {
        public static Photo ToPhoto(this PhotoDb db)
        {
            return new(db.Id, db.Path);
        }

        public static Photo[] ToPhotos(this IEnumerable<PhotoDb> dbs)
        {
            return dbs.Select(ToPhoto).ToArray();
        }

        public static PhotoDb ToDb(this PhotoBlank blank, Guid systemUser)
        {
            return new(blank.Id.Value, blank.Image, DateTime.Now, systemUser);
        }
    }
}
