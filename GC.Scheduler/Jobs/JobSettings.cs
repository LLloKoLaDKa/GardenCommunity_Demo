using Quartz;
using System;

namespace GC.Scheduler.Jobs
{
    public abstract class JobSettings
    {
        public Type JobType { get; }
        public IJobDetail JobDetail { get; }
        public ITrigger Trigger { get; }

        protected JobSettings(Type jobType, IJobDetail jobDetail, ITrigger trigger)
        {
            JobType = jobType;
            JobDetail = jobDetail;
            Trigger = trigger;
        }
    }
}
