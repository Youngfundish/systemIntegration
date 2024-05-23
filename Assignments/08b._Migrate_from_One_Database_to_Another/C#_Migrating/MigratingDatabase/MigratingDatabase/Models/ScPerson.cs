using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MigratingDatabase.Models
{
    public partial class ScPerson
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Phone { get; set; }
        public string? Persontype { get; set; }

        public virtual ScContactPerson? ScContactPerson { get; set; }
        public virtual ScEmployee? ScEmployee { get; set; }
    }
}
