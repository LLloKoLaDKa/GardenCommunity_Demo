using GC.Tools.Types.Results;
using System;
using System.Collections.Generic;
using System.Data;

namespace GC.Tools.DB
{
    public interface IDataAccess: IDisposable
    {
        Int32 Execute(String sql, IList<SqlParameter> parameters = null, CommandType commandType = CommandType.Text);
        Int32 Execute(String sql, Object parameters, CommandType commandType = CommandType.Text);
        T Get<T>(String sql, IList<SqlParameter> parameters = null, CommandType commandType = CommandType.Text);
        List<T> GetList<T>(String sql, IList<SqlParameter> parameters = null, CommandType commandType = CommandType.Text);  // TICKET убрать type
    }
}
