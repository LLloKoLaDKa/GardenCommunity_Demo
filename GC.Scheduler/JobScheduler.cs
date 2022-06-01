using Microsoft.Extensions.DependencyInjection;
using Quartz;
using Quartz.Impl;
using Quartz.Logging;
using GC.Scheduler.Jobs;
using GC.Scheduler.Jobs.TaskQueueJob;
using System;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;

namespace GC.Scheduler
{
    internal class JobScheduler
    {
        private static readonly Type[] ActiveTasks =
        {
            typeof(TaskQueueJob)
        };

        public static async Task StartAsync(ServiceCollection services)
        {
            Console.WriteLine($"[{DateTime.Now.ToLongTimeString()}] Execute Scheduler");

            LogProvider.SetCurrentLogProvider(new CustomLogProvider());

            try
            {
                NameValueCollection props = new NameValueCollection
                {
                    { "quartz.serializer.type", "binary" }
                };

                foreach (var jobType in ActiveTasks)
                    services.AddScoped(jobType);

                ISchedulerFactory factory = new StdSchedulerFactory(props);
                IScheduler scheduler = await factory.GetScheduler().ConfigureAwait(false);
                scheduler.JobFactory = new JobFactory(services.BuildServiceProvider());

                await scheduler.Start().ConfigureAwait(false);

                Type[] jobSettingsTypes = typeof(Program).Assembly.GetTypes()
                    .Where(t => typeof(JobSettings).IsAssignableFrom(t) && !t.IsAbstract).ToArray();

                foreach (Type jobSettingsType in jobSettingsTypes)
                {
                    JobSettings jobSettings = (JobSettings)Activator.CreateInstance(jobSettingsType);
                    if (!ActiveTasks.Contains(jobSettings.JobType)) continue;

                    await scheduler.ScheduleJob(jobSettings.JobDetail, jobSettings.Trigger).ConfigureAwait(false);
                }
            }
            catch (SchedulerException se)
            {
                await Console.Error.WriteLineAsync(se.ToString()).ConfigureAwait(false);
                throw;
            }
        }

        private class CustomLogProvider : ILogProvider
        {
            public Logger GetLogger(String name)
            {
                return (level, func, exception, parameters) =>
                {
                    if (level >= LogLevel.Info && func != null)
                    {
                        Console.WriteLine($"[{DateTime.Now.ToLongTimeString()}] [{level}] {func.Invoke()}", parameters);
                    }
                    else if (level >= LogLevel.Error)
                    {
                        Console.Error.WriteLine(exception?.Message);
                    }

                    return true;
                };
            }

            public IDisposable OpenNestedContext(String message) => throw new NotImplementedException();

            public IDisposable OpenMappedContext(String key, String value) => throw new NotImplementedException();

            public IDisposable OpenMappedContext(String key, Object value, Boolean destructure = false) => throw new NotImplementedException();
        }
    }
}
