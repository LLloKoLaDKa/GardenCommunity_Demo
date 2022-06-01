using GC.EntitiesCore.Models;
using GC.EntitiesCore.Models.Configurations;
using GC.EntitiesCore.Models.Contacts;
using GC.EntitiesCore.Models.Gardens;
using GC.EntitiesCore.Models.Records.Ads;
using GC.EntitiesCore.Models.Records.Novelties;
using GC.EntitiesCore.Models.Statistics;
using GC.EntitiesCore.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace GC.EntitiesCore.Context
{
    public class GardenContext : DbContext
    {
        public DbSet<ConfigurationDb> Configurations { get; set; }
        public DbSet<UserAccessRoleDb> UserAccesRoles { get; set; }
        public DbSet<UserDb> Users { get; set; }
        public DbSet<UserPermissionDb> UserPermissions { get; set; }
        public DbSet<UserTokenDb> UserTokens { get; set; }
        public DbSet<AppealDb> Appeals { get; set; }
        public DbSet<GardenerDb> Gardeners { get; set; }
        public DbSet<GardenSectorDb> GardenSectors { get; set; }
        public DbSet<SectorSaleDb> SectorSales { get; set; }
        public DbSet<SectorCreditDb> SectorCredits { get; set; }
        public DbSet<PhotoDb> Photos { get; set; }
        public DbSet<AdDb> Ads { get; set; }
        public DbSet<NoveltyDb> Novelties { get; set; }
        public DbSet<GardenContactDb> GardenContacts { get; set; }
        public DbSet<ForeignContactDb> ForeignContacts { get; set; }
        public DbSet<EmergencyContactDb> EmergencyContacts { get; set; }
        public DbSet<PageEntryDb> PageEntries { get; set; }

        public GardenContext(DbContextOptions<GardenContext> options) : base(options) { }
    }
}
