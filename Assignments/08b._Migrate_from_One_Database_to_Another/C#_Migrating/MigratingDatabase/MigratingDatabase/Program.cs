using Microsoft.EntityFrameworkCore;
using MigratingDatabase.Models;
using MigratingDatabase;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;

class Program
{
    static void Main(string[] args)
    {
        //Lav et nyt projekt
        //Kør derefter denne i PM Scaffold-DbContext "Server=.\SQLExpress;Database=SchoolDB;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer - OutputDir Models
        //Det giver models og DBContext
        var oldOptions = new DbContextOptionsBuilder<ServiceContractDBContext>()
            .UseSqlServer("Server=LAPTOP-0HJL08GI\\SQLEXPRESS;Database=ServiceContractDB;Trusted_Connection=True")
            .Options;

        var newOptions = new DbContextOptionsBuilder<ServiceContractDBContext>()
            .UseSqlServer("Server=LAPTOP-0HJL08GI\\SQLEXPRESS;Database=NewServiceContractDB;Trusted_Connection=True")
            .Options;

        using (var newContext = new ServiceContractDBContext(newOptions))
        {
            DropTables(newContext);
        }

        using (var oldContext = new ServiceContractDBContext(oldOptions))
        using (var newContext = new ServiceContractDBContext(newOptions))
        {
            DataMigration.MigrateData(oldContext, newContext);
        }
    }

    static void DropTables(ServiceContractDBContext context)
    {
        context.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS [sc_ServiceTask]");
        context.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS [sc_ContactPerson]");
        context.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS [sc_Employee]");
        context.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS [sc_ServiceCustomer]");
        context.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS [sc_Person]");
        context.Database.ExecuteSqlRaw("DROP TABLE IF EXISTS [sc_CityZipCode]");
        Console.WriteLine("Tables dropped.");
    }
}
