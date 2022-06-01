using GC.Services.Configurator;
using GC.Tools.Json;
using GC.WebSpace.Infrastructure.Filters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;

namespace GC.WebSpace
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment environment)
        {
            Configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"Configurations/DbConnections/connectionStrings.{environment.EnvironmentName}.json")
                .Build();
            Debug.WriteLine(environment.EnvironmentName);
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews(mvcOptions =>
            {
                mvcOptions.EnableEndpointRouting = false;
                mvcOptions.Filters.Add<IsAuthorizedFilter>();
            })
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.AddJsonSettings();
            });

            services.Initialize(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.ConfigureExceptionHandler();

            app.UseStaticFiles();

            //app.UseHttpsRedirection();

            app.UseStatusCodePagesWithRedirects("/Error/{0}");

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/action=Index/{id?}");
            });
        }
    }
}
