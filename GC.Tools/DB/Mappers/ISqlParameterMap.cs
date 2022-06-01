using System;
using System.Data;

namespace GC.Tools.DB.Mappers
{
    internal interface ISqlParameterMap
    {
        Type ParameterType { get; }
        DbType DbType { get; }
    }
}
