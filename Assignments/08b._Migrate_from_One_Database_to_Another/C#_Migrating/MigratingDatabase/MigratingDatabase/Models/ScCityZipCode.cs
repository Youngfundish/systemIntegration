using System;
using System.Collections.Generic;

namespace MigratingDatabase.Models
{
    public partial class ScCityZipCode
    {
        public ScCityZipCode()
        {
            ScServiceCustomers = new HashSet<ScServiceCustomer>();
        }

        public int ZipCode { get; set; }
        public string? City { get; set; }

        public virtual ICollection<ScServiceCustomer> ScServiceCustomers { get; set; }
    }
}
