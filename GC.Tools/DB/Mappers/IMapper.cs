using GC.Tools.DB.Enums;
using System;

namespace GC.Tools.DB.Mappers
{
    internal interface IMapper
    {
        MapperType Type { get; }
        Type EntityType { get; }
    }
}
