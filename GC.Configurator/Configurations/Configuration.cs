using GC.Domain.Configurations;
using GC.EntitiesCore.Repositories.Configurations;
using GC.Tools.Types.Results;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.Configurator.Configurations
{
    public class Configuration
    {
        private static IConfigurationsRepository _configurationsRepository;

        private static Dictionary<String, String> _configurations = new Dictionary<String, String>();
        private static String _environment;
        public static Boolean IsProduction => _environment == "Production";

        public static void Initialize(String environment, IConfigurationsRepository configurationsRepository)
        {
            Environment.SetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", environment);

            _configurationsRepository = configurationsRepository;
            _configurations = _configurationsRepository.GetConfigurationItems();
            _environment = environment;

            Validate(typeof(Configuration));
        }

        private static void Validate(Type type)
        {
            foreach (var property in type.GetProperties())
                _ = property.GetValue(null);

            foreach (var nestedType in type.GetNestedTypes())
                Validate(nestedType);
        }

        #region Logger

        public static class Logger
        {
            public static String Host => GetString("Logger_Host");
            public static String ProjectId => GetString("Logger_ProjectId");
            public static String Keyword => GetString("Logger_Keyword");
        }

        #endregion

        #region Contributions

        public static class Contributions
        {
            public static Int32 MemberContribution => Int32.TryParse(GetString("MemberContribution"), out Int32 result) ? result : 0;
            public static Int32 TargetContribution => Int32.TryParse(GetString("TargetContribution"), out Int32 result) ? result : 0;
        }

        public static class GardenSettings
        {
            public static Int64 Ogrn => Int64.TryParse(GetString("OGRN"), out Int64 result) ? result : 0;
            public static Int64 Inn => Int64.TryParse(GetString("INN"), out Int64 result) ? result : 0;
            public static Int64 Kpp => Int64.TryParse(GetString("KPP"), out Int64 result) ? result : 0;
            public static Int64 Okpo => Int64.TryParse(GetString("OKPO"), out Int64 result) ? result : 0;
            public static Int64 Oktmo => Int64.TryParse(GetString("OKTMO"), out Int64 result) ? result : 0;
            public static String CheckingAccount => GetString("CheckingAccount");
            public static String BankName => GetString("BankName");
            public static String CorrespondentAccount => GetString("CorrespondentAccount");
            public static String Address => GetString("Address");
            public static Int64 Bik => Int64.TryParse(GetString("BIK"), out Int64 result) ? result : 0;
        }

        #endregion Contributions

        private static String GetString(String key)
        {
            return _configurations.ContainsKey(key) ? _configurations[key] : "";
        }

        public static Result SaveConfiguration(ConfigurationItemBlank configurationItemBlank, Guid userId)
        {
            if (configurationItemBlank is null) return Result.Fail("Конфигурация пуста, попробуйте отправить другие данные");

            Result configurationBlankResult = configurationItemBlank.Validate();
            if (!configurationBlankResult.IsSuccess) return configurationBlankResult;

            if (_configurations.ContainsKey(configurationItemBlank.Key)) 
                _configurations[configurationItemBlank.Key] = configurationItemBlank.Value;
            else
                _configurations.Add(configurationItemBlank.Key, configurationItemBlank.Value);

            _configurationsRepository.SaveConfiguration(configurationItemBlank, userId);

            return Result.Success();
        }

        public static Result RemoveConfiguration(String key)
        {
            if (String.IsNullOrWhiteSpace(key)) return Result.Fail("Удаляемая конфигурация пуста");

            _configurations.Remove(key);
            _configurationsRepository.RemoveConfiguration(key);
            return Result.Success();
        }

        public static PagedResult<ConfigurationItem> GetConfigurationsPaged(Int32 page, Int32 count)
        {
            Int32 offset = (page - 1) * count;

            if (offset < 0) offset = 0;
            if (count < 0) count = 0;

            return new PagedResult<ConfigurationItem>(_configurations
                .Select(c => new ConfigurationItem(c.Key, c.Value))
                .Skip(offset)
                .Take(count)
                .ToList(), _configurations.Count);
        }
    }
}
