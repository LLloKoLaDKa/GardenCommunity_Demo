using GC.Domain.Gardens.Appeals;
using GC.Tools.Types.Results;
using System;

namespace GC.Services.Gardens
{
    public partial class GardensService
    {
        public Result SaveAppeal(AppealBlank blank)
        {
            if (blank.Id is null) blank.Id = Guid.NewGuid();
            if (String.IsNullOrWhiteSpace(blank.FirstName)) return Result.Fail("Не указано имя отправителя");
            if (String.IsNullOrWhiteSpace(blank.LastName)) return Result.Fail("Не указана фамилия отправителя");
            if (String.IsNullOrWhiteSpace(blank.PhoneNumber)) return Result.Fail("Не указан номер отправителя");
            if (String.IsNullOrWhiteSpace(blank.Title)) return Result.Fail("Не указана тема обращения");
            if (String.IsNullOrWhiteSpace(blank.Message)) return Result.Fail("Не указано сообщение обращения");
            if (blank.Email is not null && (String.IsNullOrWhiteSpace(blank.Email) || !blank.Email.Contains("@"))) return Result.Fail("Неверный формат почты");

            blank.Date = DateTime.Now;
            _gardensRepository.SaveAppeal(blank);

            return Result.Success();
        }

        public PagedResult<Appeal> GetAppealsPaged(Int32 page, Int32 pageSize, DateTime? startDate, DateTime? endDate, String? search)
        {
            if (startDate is not null)
            {
                startDate = new DateTime(startDate.Value.Year, startDate.Value.Month, startDate.Value.Day);
            }
            
            if (endDate is not null)
            {
                endDate = new DateTime(endDate.Value.Year, endDate.Value.Month, endDate.Value.Day);
            }

            return _gardensRepository.GetAppealsPaged(page, pageSize, startDate, endDate, search);
        }

        public void SetViewed(Guid appealId, Guid systemUserId)
        {
            _gardensRepository.SetViewed(appealId, systemUserId);
        }
    }
}
