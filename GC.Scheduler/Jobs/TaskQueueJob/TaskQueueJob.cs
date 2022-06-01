using Quartz;
using System;
using System.Threading.Tasks;

namespace GC.Scheduler.Jobs.TaskQueueJob
{
    class TaskQueueJob : Job
    {
        private const Int32 TaskCount = 5;

        public override JobSettings Settings => new TaskQueueJobSettings();

        public TaskQueueJob(IQueueService queueService, IQueueTaskEventFactory queueTaskEventFactory)
        {
            _queueService = queueService;
            _eventFactory = queueTaskEventFactory;
        }

        public override async Task Execute(IJobExecutionContext context)
        {
            try
            {
                QueueTask[] tasks = _queueService.GetReadyQueueTasks(TaskCount);
                if (tasks is null || tasks.Length == 0) return;

                Parallel.ForEach(tasks, CompleteTask);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message).ConfigureAwait(false);
                Logger.SendError(ex.Message, DateTime.UtcNow, "SMMS.Scheduler", ex);
            }
        }

        private void CompleteTask(QueueTask queueTask)
        {
            try
            {
                _queueService.ProgressQueueTask(queueTask);
                var executor = _eventFactory.BuildExecutor(queueTask);

                executor.Execute();

                _queueService.CompleteQueueTask(queueTask);
            }
            catch (Exception ex)
            {
                _queueService.CompleteQueueTask(queueTask, ex.Message);
                Console.Out.WriteLineAsync(ex.Message).ConfigureAwait(false);
                Logger.SendError(ex.Message, DateTime.UtcNow, "SMMS.Scheduler", ex);
            }
        }
    }
    internal class TaskQueueJobSettings : JobSettings
    {
        public TaskQueueJobSettings() : base(typeof(TaskQueueJob), GetJobDetail(), GetTrigger()) { }

        private static IJobDetail GetJobDetail()
        {
            return JobBuilder.Create<TaskQueueJob>()
                .StoreDurably()
                .WithIdentity("TaskQueueJobSettings", "TaskQueueGroup")
                .Build();
        }

        private static ITrigger GetTrigger()
        {
            return TriggerBuilder.Create()
                .WithIdentity("TaskQueueJobSettings", "TaskQueueGroup")
                .StartNow()
                .ForJob(GetJobDetail())
                .WithSimpleSchedule(x => x
                    .WithIntervalInSeconds(1)
                    .RepeatForever()
                    .WithMisfireHandlingInstructionNextWithRemainingCount()
                )
                .Build();
        }
    }
}
