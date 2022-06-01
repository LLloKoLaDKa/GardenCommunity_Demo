using System;

namespace GC.Tools.DB
{
    public class SqlParameter
    {
        public String Name { get; private set; }
        public Object Value { get; private set; }

        public SqlParameter(String name, Object value)
        {
            Name = name;
            Value = value;
        }

        public void SetValue(Object value)
        {
            Value = value;
        }
    }
}
