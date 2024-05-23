using System;
using System.Collections.Generic;

namespace MigratingDatabase.Models
{
    public partial class ScEmployee
    {
        public ScEmployee()
        {
            ScServiceTasks = new HashSet<ScServiceTask>();
        }

        public int Personid { get; set; }
        public int Department { get; set; }
        public int Userrole { get; set; }
        public string? PasswordHash { get; set; }

        public virtual ScPerson Person { get; set; } = null!;
        public virtual ICollection<ScServiceTask> ScServiceTasks { get; set; }
    }
}
