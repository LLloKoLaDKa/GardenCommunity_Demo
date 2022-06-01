using System;
using System.Collections.Generic;
using System.Linq;

namespace GC.Tools.Types.Results
{
    public readonly struct DataResult<T>
    {
        public T Data { get; }
        public IEnumerable<Error> Errors { get; }
        public Boolean IsSuccess => !Errors?.Any() ?? true;

        public DataResult(T data, IEnumerable<Error> errors = default)
        {
            Data = data;
            Errors = errors;
        }

        public static DataResult<T> Success(T data = default)
        {
            return new(data);
        }

        public static DataResult<T> Failed(IEnumerable<Error> errors)
        {
            return new(default, errors);
        }

        public static DataResult<T> Failed(String error)
        {
            return new(default, new[] { new Error(error) });
        }
    }
}
