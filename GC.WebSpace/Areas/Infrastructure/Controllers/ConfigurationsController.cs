using Microsoft.AspNetCore.Mvc;
using GC.WebSpace.Infrastructure.Filters;
using GC.Configurator.Configurations;
using GC.Domain.AccessPolicies;
using GC.Tools.Types.Results;
using System;
using GC.Domain.Configurations;

namespace GC.WebSpace.Areas.Infrastructure.Controllers
{
    public class ConfigurationsController : BaseAuthorizedController
    {
        [Route("/IS/Configurations")]
        [IsAuthorized(AccessPolicy.Configurations_Catalog)]
        public IActionResult Index() => ReactApp("configurations", "Конфигурации");

        [HttpPost("/IS/Configurations/Save")]
        [IsAuthorized(AccessPolicy.Configurations_Catalog)]
        public Result SaveConfiguration([FromBody] ConfigurationItemBlank configurationItemBlank)
        {
            return Configuration.SaveConfiguration(configurationItemBlank, SystemUser.Id);
        }

        [HttpGet("/IS/Configurations/GetConfigurationsPaged")]
        [IsAuthorized(AccessPolicy.Configurations_Catalog)]
        public PagedResult<ConfigurationItem> GetConfigurationsPaged(int page, int count)
        {
            return Configuration.GetConfigurationsPaged(page, count);
        }

        [HttpPost("/IS/Configurations/Remove")]
        [IsAuthorized(AccessPolicy.Configurations_Catalog)]
        public Result RemoveConfiguration([FromBody] string configurationKey)
        {
            return Configuration.RemoveConfiguration(configurationKey);
        }
    }
}
