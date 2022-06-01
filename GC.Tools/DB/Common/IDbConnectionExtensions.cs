using System;
using System.Data;

namespace GC.Tools.DB.Common
{
    public static class IDbConnectionExtensions
    {
        public static T ExecuteCommand<T>(this IDbConnection connection, Func<IDbCommand, T> func, IDbTransaction transaction = null)
        {
            using (IDbCommand command = connection.CreateCommand())
            {
                if (transaction != null)
                    command.Transaction = transaction;

                return func(command);
            }
        }
    }
}
