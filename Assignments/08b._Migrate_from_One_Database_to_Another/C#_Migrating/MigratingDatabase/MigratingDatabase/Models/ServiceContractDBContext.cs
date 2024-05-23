using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MigratingDatabase.Models
{
    public partial class ServiceContractDBContext : DbContext
    {
        public ServiceContractDBContext()
        {
        }

        public ServiceContractDBContext(DbContextOptions<ServiceContractDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ScCityZipCode> ScCityZipCodes { get; set; } = null!;
        public virtual DbSet<ScContactPerson> ScContactPeople { get; set; } = null!;
        public virtual DbSet<ScEmployee> ScEmployees { get; set; } = null!;
        public virtual DbSet<ScPerson> ScPeople { get; set; } = null!;
        public virtual DbSet<ScServiceCustomer> ScServiceCustomers { get; set; } = null!;
        public virtual DbSet<ScServiceTask> ScServiceTasks { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=LAPTOP-0HJL08GI\\SQLEXPRESS;Database=ServiceContractDB;Trusted_Connection=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ScCityZipCode>(entity =>
            {
                entity.HasKey(e => e.ZipCode)
                    .HasName("PK__sc_CityZ__FF8A3D3F69EF1382");

                entity.ToTable("sc_CityZipCode");

                entity.Property(e => e.ZipCode)
                    .ValueGeneratedNever()
                    .HasColumnName("zipCode");

                entity.Property(e => e.City)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("city");
            });

            modelBuilder.Entity<ScPerson>(entity =>
            {
                entity.ToTable("sc_Person");

                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).UseIdentityColumn();

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Persontype)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("persontype");

                entity.Property(e => e.Phone)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .HasColumnName("phone");
            });

            modelBuilder.Entity<ScContactPerson>(entity =>
            {
                entity.HasKey(e => e.Personid)
                    .HasName("PK__sc_Conta__EC7C61750DE44081");

                entity.ToTable("sc_ContactPerson");

                entity.Property(e => e.Personid)
                    .ValueGeneratedNever()
                    .HasColumnName("personid");

                entity.Property(e => e.Customerid).HasColumnName("customerid");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.ScContactPeople)
                    .HasForeignKey(d => d.Customerid)
                    .HasConstraintName("fk_customerid");

                entity.HasOne(d => d.Person)
                    .WithOne(p => p.ScContactPerson)
                    .HasForeignKey<ScContactPerson>(d => d.Personid)
                    .HasConstraintName("fk_cpersonid");
            });

            modelBuilder.Entity<ScEmployee>(entity =>
            {
                entity.HasKey(e => e.Personid)
                    .HasName("PK__sc_Emplo__EC7C617569FF5CD5");

                entity.ToTable("sc_Employee");

                entity.Property(e => e.Personid)
                    .ValueGeneratedNever()
                    .HasColumnName("personid");

                entity.Property(e => e.Department).HasColumnName("department");

                entity.Property(e => e.PasswordHash)
                    .HasMaxLength(60)
                    .IsUnicode(false)
                    .HasColumnName("passwordHash");

                entity.Property(e => e.Userrole).HasColumnName("userrole");

                entity.HasOne(d => d.Person)
                    .WithOne(p => p.ScEmployee)
                    .HasForeignKey<ScEmployee>(d => d.Personid)
                    .HasConstraintName("fk_personid");
            });

            modelBuilder.Entity<ScServiceCustomer>(entity =>
            {
                entity.ToTable("sc_ServiceCustomer");

                entity.HasIndex(e => e.Aonr, "UQ__sc_Servi__5A69D22A85115857")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Id).UseIdentityColumn();

                entity.Property(e => e.Address)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.Aonr).HasColumnName("aonr");

                entity.Property(e => e.Companyname)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("companyname");

                entity.Property(e => e.Cvr)
                    .HasMaxLength(9)
                    .IsUnicode(false)
                    .HasColumnName("cvr");

                entity.Property(e => e.Zipcode).HasColumnName("zipcode");

                entity.HasOne(d => d.ZipcodeNavigation)
                    .WithMany(p => p.ScServiceCustomers)
                    .HasForeignKey(d => d.Zipcode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_scZipcode");
            });

            modelBuilder.Entity<ScServiceTask>(entity =>
            {
                entity.ToTable("sc_ServiceTask");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Id).UseIdentityColumn();

                entity.Property(e => e.Contacttype)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("contacttype");

                entity.Property(e => e.Creationdate)
                    .HasColumnType("datetime")
                    .HasColumnName("creationdate");

                entity.Property(e => e.Customeraonr).HasColumnName("customeraonr");

                entity.Property(e => e.Customerid).HasColumnName("customerid");

                entity.Property(e => e.Description)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.Employeeid).HasColumnName("employeeid");

                entity.Property(e => e.Priority).HasColumnName("priority");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("type");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.ScServiceTasks)
                    .HasForeignKey(d => d.Customerid)
                    .HasConstraintName("fk_task_customerid");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.ScServiceTasks)
                    .HasForeignKey(d => d.Employeeid)
                    .HasConstraintName("fk_employeeid");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
