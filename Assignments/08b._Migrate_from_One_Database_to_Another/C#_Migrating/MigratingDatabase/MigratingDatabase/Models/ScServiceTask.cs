using System;
using System.Collections.Generic;

namespace MigratingDatabase.Models
{
    public partial class ScServiceTask
    {
        public int Id { get; set; }
        public DateTime? Creationdate { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
        public string? Contacttype { get; set; }
        public int? Customeraonr { get; set; }
        public int Priority { get; set; }
        public bool? Status { get; set; }
        public int? Employeeid { get; set; }
        public int? Customerid { get; set; }

        public virtual ScServiceCustomer? Customer { get; set; }
        public virtual ScEmployee? Employee { get; set; }
    }
}
