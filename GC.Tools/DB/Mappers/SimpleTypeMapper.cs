using GC.Tools.DB.Enums;
using System;

namespace GC.Tools.DB.Mappers
{
    internal class SimpleTypeMapper : IMapper
    {
        public MapperType Type => MapperType.SimpleType;

        public Type EntityType { get; }

        public SimpleTypeMapper(Type entityType)
        {
            EntityType = entityType;
        }
    }
}
