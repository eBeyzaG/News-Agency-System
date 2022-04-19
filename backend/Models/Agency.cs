using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace NewsWebsite.Models
{
    public partial class Agency
    {
        public Agency()
        {
            Reporters = new HashSet<Reporter>();
        }

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public int EstablishmentYear { get; set; }

        public virtual ICollection<Reporter> Reporters { get; set; }
    }
}
