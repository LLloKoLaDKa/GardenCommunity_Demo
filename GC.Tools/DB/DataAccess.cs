using GC.Tools.DB.Common;
using GC.Tools.DB.Mappers;
using GC.Tools.Extensions;
using GC.Tools.Types.Results;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Reflection;

namespace GC.Tools.DB
{
    public class DataAccess : IDataAccess
    {
        private ConcurrentDictionary<Type, IMapper> Mappers { get; }
        private IDbConnection Connection { get; }
        private IDbTransaction Transaction { get; }


        internal DataAccess(IDbConnection connection, IDbTransaction transaction = null, ConcurrentDictionary<Type, IMapper> mappers = null)
        {
            Mappers = mappers ?? new ConcurrentDictionary<Type, IMapper>();
            Connection = connection;
            Transaction = transaction;
        }

        private IMapper GetAndSetMapperType(Type type)
        {
            if (Mappers.TryGetValue(type, out IMapper mapperType))
            {
                return mapperType;
            }

            if (ReflectionHelper.IsSimpleType(type))
            {
                mapperType = new SimpleTypeMapper(type);
            }
            else
            {
                mapperType = new ClassMapper(type);
            }

            Mappers[type] = mapperType;

            return mapperType;
        }

        public Int32 Execute(String sql, IList<SqlParameter> parameters = null, CommandType commandType = CommandType.Text)
        {
            return Connection.ExecuteCommand(command =>
            {
                if (parameters != null)
                    command.AddParameters(parameters);

                command.CommandType = commandType;
                command.CommandText = sql;
                command.Prepare();
                return command.ExecuteNonQuery();

            }, Transaction);
        }

        public Int32 Execute(String sql, Object parameters, CommandType commandType = CommandType.Text)
        {
            List<SqlParameter> sqlParameters = new();
            foreach (PropertyInfo property in parameters.GetType().GetProperties())
            {
                sqlParameters.Add(new SqlParameter($"p_{property.Name.ToCamelCase()}", property.GetValue(parameters)));
            }

            return Execute(sql, sqlParameters, commandType);
        }

        public T Get<T>(String sql, IList<SqlParameter> parameters = null, CommandType commandType = CommandType.Text)
        {
                return Connection.ExecuteCommand(command =>
            {
                if (parameters != null)
                    command.AddParameters(parameters);

                command.CommandType = commandType;
                command.CommandText = sql;
                command.Prepare();

                using (IDataReader dataReader = command.ExecuteReader())
                {
                    IMapper mapper = GetAndSetMapperType(typeof(T));
                    return dataReader.GetValue<T>(mapper);
                }

            }, Transaction);
        }

        public List<T> GetList<T>(String sql, IList<SqlParameter> parameters = null, CommandType commandType = CommandType.Text)
        {
            return Connection.ExecuteCommand(command =>
            {
                if (parameters != null)
                    command.AddParameters(parameters);

                command.CommandType = commandType;
                command.CommandText = sql;
                command.Prepare();

                using (IDataReader dataReader = command.ExecuteReader())
                {
                    IMapper mapper = GetAndSetMapperType(typeof(T));
                    return dataReader.GetList<T>(mapper);
                }

            }, Transaction);
        }

        public PagedResult<T> GetPage<T>(String sql, IList<SqlParameter> parameters = null, CommandType commandType = CommandType.Text)
        {
            IMapper dataType = GetAndSetMapperType(typeof(T));
            IMapper dataTypeInt = GetAndSetMapperType(typeof(Int64));

            return Connection.ExecuteCommand(command =>
            {
                if (parameters != null)
                    command.AddParameters(parameters);

                command.CommandType = commandType;
                command.CommandText = sql;
                command.Prepare();

                using (IDataReader dr = command.ExecuteReader())
                {
                    Int64 totalRows = dr.GetValue<Int64>(dataTypeInt);

                    dr.NextResult();

                    return new PagedResult<T>(dr.GetList<T>(dataType), totalRows);
                }
            });
        }

        public void Dispose()
        {
            Connection?.Dispose();
            Transaction?.Dispose();
            System.GC.SuppressFinalize(this);
        }
    }
}

