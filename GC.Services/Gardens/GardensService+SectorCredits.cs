using ClosedXML.Excel;
using GC.Domain.Gardens.Enums;
using GC.Domain.Gardens.Sectors.Credits;
using GC.Domain.Services.Gardens;
using GC.Tools.Types.Results;
using System;
using System.Data;
using System.Linq;

namespace GC.Services.Gardens
{
    public partial class GardensService: IGardensService
    {
        public Result SaveCredit(SectorCreditBlank creditBlank, Guid systemUserId)
        {
            if (creditBlank.Id is null) creditBlank.Id = Guid.NewGuid();
            if (creditBlank.SectorId is null) return Result.Fail("Не указан участок");
            if (creditBlank.Credit is null || creditBlank.Credit < 0) return Result.Fail("Неверное число задолжности");

            _gardensRepository.SaveCredit(creditBlank, systemUserId);
            return Result.Success();
        }

        public SectorCredit[] GetNonZeroCredits()
        {
            return _gardensRepository.GetNonZeroCredits();
        }

        public PagedResult<SectorCredit> GetCreditsPaged(Int32 page, Int32 count, Int32? sectorNumber, SectorCreditSort? sort)
        {
            return _gardensRepository.GetCreditsPaged(page, count, sectorNumber, sort);
        }

        public DateTime? GetLastModifiedDateTime()
        {
            return _gardensRepository.GetLastModifiedDateTime();
        }

        public Result TryRenderReport()
        {
            try
            {
                SectorCredit[] credits = _gardensRepository.GetNonZeroCredits().OrderBy(c => c.Sector.SectorNumber).ToArray();

                XLWorkbook book = new XLWorkbook();
                IXLWorksheet sheet = book.Worksheets.Add("Задолженности");

                // Title
                sheet.Cell(2, 2).Value = $"Задолженности на {DateTime.Now.ToString("dd.MM.yyyy")}";
                sheet.Range(2, 2, 2, 4).Merge().AddToNamed("Title");

                // Headers
                sheet.Cell(3, 2).Value = "Участок";
                sheet.Cell(3, 2).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                sheet.Cell(3, 2).Style.Border.RightBorderColor = XLColor.FromArgb(41, 90, 43);
                sheet.Cell(3, 2).Style.Border.RightBorder = XLBorderStyleValues.Thin;
                sheet.Cell(3, 2).Style.Border.RightBorderColor = XLColor.FromArgb(41, 90, 43);

                sheet.Cell(3, 3).Value = "ФИО";
                sheet.Cell(3, 3).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                sheet.Cell(3, 3).Style.Border.RightBorderColor = XLColor.FromArgb(41, 90, 43);
                sheet.Cell(3, 3).Style.Border.RightBorder = XLBorderStyleValues.Thin;
                sheet.Cell(3, 3).Style.Border.RightBorderColor = XLColor.FromArgb(41, 90, 43);

                sheet.Cell(3, 4).Value = "Задолженность (руб.)";
                sheet.Cell(3, 4).Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                sheet.Cell(3, 4).Style.Border.RightBorderColor = XLColor.FromArgb(41, 90, 43);

                // Data
                for (int i = 0; i < credits.Length; i++)
                {
                    Int32 row = 4 + i;

                    SectorCredit credit = credits[i];
                    sheet.Cell(row, 2).Value = credit.Sector.SectorNumber;
                    sheet.Cell(row, 3).Value = credit.Gardener.Initials;
                    sheet.Cell(row, 4).Value = credit.Credit;

                    if (i % 2 == 1)
                    {
                        sheet.Cell(row, 2).Style.Fill.BackgroundColor = XLColor.DarkSeaGreen;
                        sheet.Cell(row, 3).Style.Fill.BackgroundColor = XLColor.DarkSeaGreen;
                        sheet.Cell(row, 4).Style.Fill.BackgroundColor = XLColor.DarkSeaGreen;
                    }
                }

                #region Styles

                IXLStyle titlesStyle = book.NamedRanges.NamedRange("Title").Ranges.Style;
                titlesStyle.Font.Bold = true;
                titlesStyle.Font.FontColor = XLColor.White;
                titlesStyle.Fill.BackgroundColor = XLColor.FromArgb(41, 90, 43);

                sheet.Rows().Style.Font.FontSize = 18;
                sheet.Rows().Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                #endregion Styles

                sheet.Columns().AdjustToContents();
                sheet.PageSetup.CenterHorizontally = true;
                sheet.PageSetup.Margins.Left = 0.1;
                sheet.PageSetup.Margins.Right = 0.1;

                String webRootPath = _hostingEnvironment.ContentRootPath;
                String path = $"{webRootPath}\\wwwroot\\docs\\Report.xlsx";
                book.SaveAs(path);
            }
            catch (Exception exception)
            {
                return Result.Fail($"Не удалось выполнить загрузку отчёта о задолжностях. Обратитесь к разработчику за помощью.\n {exception.Message}");
            }

            return Result.Success();
        }

        public Result DeleteCredit(Guid sectorCreditId)
        {
            _gardensRepository.DeleteCredit(sectorCreditId);
            return Result.Success();
        }
    }
}
