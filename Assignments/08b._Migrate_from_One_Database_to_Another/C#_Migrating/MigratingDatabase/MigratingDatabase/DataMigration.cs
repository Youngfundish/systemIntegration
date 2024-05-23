using EFCore.BulkExtensions;
using MigratingDatabase.Models;

namespace MigratingDatabase
{
    public class DataMigration
    {
        public static void MigrateData(ServiceContractDBContext oldContext, ServiceContractDBContext newContext)
        {
            newContext.Database.EnsureCreated();

            // Copy sc_CityZipCode
            if (!newContext.ScCityZipCodes.Any())
            {
                var cityZipCodes = oldContext.ScCityZipCodes
                    .Select(czc => new ScCityZipCode
                    {
                        ZipCode = czc.ZipCode,
                        City = czc.City
                    })
                    .ToList();

                newContext.BulkInsert(cityZipCodes);
                Console.WriteLine("sc_CityZipCode copied.");
            }
            else
            {
                Console.WriteLine("sc_CityZipCode already exists.");
            }

            // Copy sc_Person
             if (!newContext.ScPeople.Any())
            {
                var people = oldContext.ScPeople
                    .Select(p => new ScPerson
                    {
                        // Do not set Id here; let the database handle the identity column
                        Email = p.Email,
                        Name = p.Name,
                        Persontype = p.Persontype,
                        Phone = p.Phone
                    })
                    .ToList();

                newContext.BulkInsert(people);
                Console.WriteLine("sc_Person copied.");
            }
            else
            {
                Console.WriteLine("sc_Person already exists.");
            }

            // Copy sc_ContactPerson
            if (!newContext.ScContactPeople.Any())
            {
                var contactPeople = oldContext.ScContactPeople
                    .Select(cp => new ScContactPerson
                    {
                        // Do not set Personid here if it's an identity column
                        Customerid = cp.Customerid
                    })
                    .ToList();

                newContext.BulkInsert(contactPeople);
                Console.WriteLine("sc_ContactPerson copied.");
            }
            else
            {
                Console.WriteLine("sc_ContactPerson already exists.");
            }

            // Copy sc_Employee
            if (!newContext.ScEmployees.Any())
            {
                var employees = oldContext.ScEmployees
                    .Select(e => new ScEmployee
                    {
                        // Do not set Personid here if it's an identity column
                        Department = e.Department,
                        PasswordHash = e.PasswordHash,
                        Userrole = e.Userrole
                    })
                    .ToList();

                newContext.BulkInsert(employees);
                Console.WriteLine("sc_Employee copied.");
            }
            else
            {
                Console.WriteLine("sc_Employee already exists.");
            }

            // Copy sc_ServiceCustomer
            if (!newContext.ScServiceCustomers.Any())
            {
                var serviceCustomers = oldContext.ScServiceCustomers
                    .Select(sc => new ScServiceCustomer
                    {
                        // Do not set Id here if it's an identity column
                        Address = sc.Address,
                        Aonr = sc.Aonr,
                        Companyname = sc.Companyname,
                        Cvr = sc.Cvr,
                        Zipcode = sc.Zipcode
                    })
                    .ToList();

                newContext.BulkInsert(serviceCustomers);
                Console.WriteLine("sc_ServiceCustomer copied.");
            }
            else
            {
                Console.WriteLine("sc_ServiceCustomer already exists.");
            }

            // Copy sc_ServiceTask
            if (!newContext.ScServiceTasks.Any())
            {
                var serviceTasks = oldContext.ScServiceTasks
                    .Select(st => new ScServiceTask
                    {
                        // Do not set Id here if it's an identity column
                        Contacttype = st.Contacttype,
                        Creationdate = st.Creationdate,
                        Customeraonr = st.Customeraonr,
                        Customerid = st.Customerid,
                        Description = st.Description,
                        Employeeid = st.Employeeid,
                        Priority = st.Priority,
                        Status = st.Status,
                        Type = st.Type
                    })
                    .ToList();

                newContext.BulkInsert(serviceTasks);
                Console.WriteLine("sc_ServiceTask copied.");
            }
            else
            {
                Console.WriteLine("sc_ServiceTask already exists.");
            }
        }
    }
}
