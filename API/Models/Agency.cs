using System;
using System.Collections.Generic;

#nullable disable

namespace NewsAgencyAPI.Models
{
    public partial class Agency
    {
        public Agency()
        {
            Reporters = new HashSet<Reporter>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int EstablishmentYear { get; set; }

        public virtual ICollection<Reporter> Reporters { get; set; }
    }
}
