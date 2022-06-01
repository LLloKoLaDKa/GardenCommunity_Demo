using System;
using System.Collections.Generic;
using System.Data;

namespace GC.Tools.DB
{
    internal static class TypeMap
    {
        public static readonly Dictionary<Type, DbType> SqlTypeMap = new Dictionary<Type, DbType>
        {
            {typeof(String), DbType.String},
            {typeof(String[]), DbType.Object },
            {typeof(Int64), DbType.Int64},
            {typeof(Int64[]), DbType.Object},
            {typeof(Int32), DbType.Int32},
            {typeof(Int32[]), DbType.Object },
            {typeof(Byte), DbType.Byte},
            {typeof(Decimal), DbType.Decimal},
            {typeof(Decimal[]), DbType.Object},
            {typeof(DateTime), DbType.DateTime},
            {typeof(DateTime[]), DbType.Object},
            {typeof(Guid), DbType.Guid},
            {typeof(Guid[]), DbType.Object},
            {typeof(Boolean), DbType.Boolean},
            {typeof(Boolean[]), DbType.Object},
            {typeof(TimeSpan), DbType.Object},
            {typeof(TimeSpan[]), DbType.Object},
            {typeof(Double), DbType.Double},
            {typeof(Double[]), DbType.Object}
        };

        public static DbType LookupDbType(Type type)
        {
            if (type.IsEnum)
            {
                return DbType.Int32;
            }

            if (type.IsArray && type.GetElementType().IsEnum)
            {
                return DbType.Object;
            }

            if (SqlTypeMap.TryGetValue(type, out DbType dbType))
            {
                return dbType;
            }

            throw new ArgumentException();
        }
    }
}
