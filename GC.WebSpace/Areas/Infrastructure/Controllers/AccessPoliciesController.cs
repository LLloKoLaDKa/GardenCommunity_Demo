using GC.Domain.AccessPolicies;
using GC.Domain.Users.UserAccessRoles;
using GC.WebSpace.Infrastructure.Filters;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;

namespace GC.WebSpace.Areas.Infrastructure.Controllers
{
    public class AccessPoliciesController : BaseAuthorizedController
    {
        [Route("/IS/AccessPolicies")]
        [IsAuthorized(AccessPolicy.AccessPolicies)]
        public IActionResult Index() => ReactApp("accesspolicies", "Политики доступа");

        [HttpGet("/IS/AccessPolicies/GetPolicies")]
        [IsAuthorized(AccessPolicy.AccessPolicies)]
        public Policy[] GetPolicies()
        {
            return Enum.GetValues<AccessPolicy>()
                .Where(ap => ap != AccessPolicy.EnoughAuthorization)
                .Select(ap => ap.Policy()).ToArray();
        }

        [HttpGet("/IS/AccessPolicies/GetByUserAccessRole")]
        [IsAuthorized(AccessPolicy.AccessPolicies)]
        public Policy[] GetPoliciesByUserAccessRole(Guid roleId)
        {
            UserAccessRole role = UserAccessRolesStorage.Roles.FirstOrDefault(role => role.Id == roleId);
            if (role is null) return Array.Empty<Policy>();

            return Enum.GetValues<AccessPolicy>()
                .Where(ap => role.AccessPolicies.Contains(ap))
                .Select(ap => ap.Policy()).ToArray();
        }

        [HttpGet("/IS/AccessPolicies/GetEnum")]
        [IsAuthorized(AccessPolicy.AccessPolicies)]
        public ContentResult GetAccessPoliciesEnum()
        {
            AccessPolicy[] accessPolicies = Enum.GetValues<AccessPolicy>();

            return new ContentResult
            {
                ContentType = "text/html",
                StatusCode = (int)HttpStatusCode.OK,
                Content = string.Join(", <br/>", accessPolicies.OrderBy(ap => ap.Key())
                    .Select(ap => $"{ap} = \"{ap.Key()}\""))
            };
        }
    }
}
