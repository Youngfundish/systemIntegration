using System;
using System.Collections.Generic;

namespace MigratingDatabase.Models
{
    public partial class ScServiceCustomer
    {
        public ScServiceCustomer()
        {
            ScContactPeople = new HashSet<ScContactPerson>();
            ScServiceTasks = new HashSet<ScServiceTask>();
        }

        public int Id { get; set; }
        public string Companyname { get; set; } = null!;
        public string? Cvr { get; set; }
        public int? Aonr { get; set; }
        public string? Address { get; set; }
        public int Zipcode { get; set; }

        public virtual ScCityZipCode ZipcodeNavigation { get; set; } = null!;
        public virtual ICollection<ScContactPerson> ScContactPeople { get; set; }
        public virtual ICollection<ScServiceTask> ScServiceTasks { get; set; }
    }
}
