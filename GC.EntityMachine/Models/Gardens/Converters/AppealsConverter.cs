using GC.Domain.Gardens.Appeals;
using System.Collections.Generic;
using System.Linq;

namespace GC.EntitiesCore.Models.Gardens.Converters
{
    public static class AppealsConverter
    {
        public static Appeal ToAppeal(this AppealDb db)
        {
            return new(db.Id, db.FirstName, db.LastName, db.PhoneNumber, db.Title, db.Message, db.Email, db.Date, db.IsViewed);
        }

        public static Appeal[] ToAppeals(this IEnumerable<AppealDb> dbs)
        {
            return dbs.Select(ToAppeal).ToArray();
        }

        public static AppealDb ToDb(this AppealBlank blank)
        {
            return new(blank.Id.Value, blank.FirstName, blank.LastName, blank.PhoneNumber, blank.Title, blank.Message, blank.Email,
                blank.Date.Value, false);
        }
    }
}
