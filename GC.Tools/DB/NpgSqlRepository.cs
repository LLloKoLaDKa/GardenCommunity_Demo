using GC.Tools.DB.Mappers;
using GC.Tools.Types.Results;
using Npgsql;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;

namespace GC.Tools.DB
{
    public class NpgSqlRepository
    {
        private String ConnectionString { get; }
        private readonly ConcurrentDictionary<Type, IMapper> _mappers = new ConcurrentDictionary<Type, IMapper>();

        public NpgSqlRepository(String connectionString = null)
        {
            ConnectionString = connectionString;
        }

        public static (Int32 offset, Int32 limit) NormalizeRange(Int32 page, Int32 pageSize)
        {
            Int32 offset = Math.Max((page - 1) * pageSize, 0);
            Int32 limit = Math.Max(pageSize, 0);

            return (offset, limit);
        }

        protected Int32 Execute(String sql, IList<SqlParameter> parameters = null, CommandType commandType = CommandType.Text)
        {
            return Execution(command => command.Execute(sql, parameters, commandType));
        }

        protected Int32 Execute(String sql, Object parameters, CommandType commandType = CommandType.Text)
        {
            return Execution(command => command.Execute(sql, parameters, commandType));
        }

        protected T Get<T>(String sql, IList<SqlParameter> parameters = null, CommandType commandType = CommandType.Text)
        {
            return Execution(command => command.Get<T>(sql, parameters, commandType));
        }

        protected List<T> GetList<T>(String sql, IList<SqlParameter> parameters = null, CommandType commandType = CommandType.Text)
        {
            return Execution(command => command.GetList<T>(sql, parameters, commandType));
        }

        protected void Execution(Action<IDataAccess> command, String connectionString = null)
        {
            using (NpgsqlConnection connection = new NpgsqlConnection(connectionString ?? ConnectionString))
            {
                connection.Open();

                IDataAccess dataAccess = new DataAccess(connection, mappers: _mappers);
                command(dataAccess);
            }
        }

        protected T Execution<T>(Func<IDataAccess, T> command, String connectionString = null, Int32 commandTimeout = 30)
        {
            NpgsqlConnectionStringBuilder config = new NpgsqlConnectionStringBuilder(connectionString ?? ConnectionString)
            {
                CommandTimeout = commandTimeout
            };

            using (NpgsqlConnection connection = new NpgsqlConnection(config.ConnectionString))
            {
                connection.Open();

                IDataAccess dataAccess = new DataAccess(connection, mappers: _mappers);
                return command(dataAccess);
            }
        }

        protected void ExecutionInTransaction(Action<IDataAccess> command, String connectionString = null)
        {
            using (NpgsqlConnection connection = new NpgsqlConnection(connectionString ?? ConnectionString))
            {
                connection.Open();

                using (IDbTransaction transaction = connection.BeginTransaction())
                {
                    try
                    {
                        IDataAccess dataAccess = new DataAccess(connection, transaction, _mappers);
                        command(dataAccess);
                        transaction.Commit();
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }

                }
            }
        }
    }
}
