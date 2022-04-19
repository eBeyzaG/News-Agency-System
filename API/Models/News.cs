using System;
using System.Collections.Generic;

#nullable disable

namespace NewsAgencyAPI.Models
{
    public partial class News
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Date { get; set; }


        public int? ReporterId { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Reporter Reporter { get; set; }
    }
}
