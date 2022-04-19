using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace NewsWebsite.Models
{
    public partial class Reporter
    {
        public Reporter()
        {
            News = new HashSet<News>();
        }

        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        public int? AgencyId { get; set; }

        public virtual Agency Agency { get; set; }
        public virtual ICollection<News> News { get; set; }
    }
}
