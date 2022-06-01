using Quartz;
using System.Threading.Tasks;

namespace GC.Scheduler.Jobs
{
    [DisallowConcurrentExecution]
    public abstract class Job : IJob
    {
        public abstract JobSettings Settings { get; }
        public abstract Task Execute(IJobExecutionContext context);
    }
}
