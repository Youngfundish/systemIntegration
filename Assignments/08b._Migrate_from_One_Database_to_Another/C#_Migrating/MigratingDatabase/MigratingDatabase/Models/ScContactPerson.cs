using System;
using System.Collections.Generic;

namespace MigratingDatabase.Models
{
    public partial class ScContactPerson
    {
        public int Personid { get; set; }
        public int? Customerid { get; set; }

        public virtual ScServiceCustomer? Customer { get; set; }
        public virtual ScPerson Person { get; set; } = null!;
    }
}
