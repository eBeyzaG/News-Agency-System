using System;
using System.Collections.Generic;

#nullable disable

namespace NewsAgencyAPI.Models
{
    public partial class Reporter
    {
        public Reporter()
        {
            News = new HashSet<News>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int? AgencyId { get; set; }

        public virtual Agency Agency { get; set; }
        public virtual ICollection<News> News { get; set; }
    }
}
