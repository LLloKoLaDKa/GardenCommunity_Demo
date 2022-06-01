using GC.Tools.Types.Results;
using System;

namespace GC.Domain.Configurations
{
    public class ConfigurationItemBlank
    {
        public String? Key { get; set; }
        public String? Value { get; set; }

        public Result Validate()
        {
            if (string.IsNullOrWhiteSpace(Key)) return Result.Fail("Вы не ввели ключ конфигурации");
            if (string.IsNullOrWhiteSpace(Value)) return Result.Fail("Вы не ввели значение конфигурации");

            return Result.Success();
        }
    }
}
