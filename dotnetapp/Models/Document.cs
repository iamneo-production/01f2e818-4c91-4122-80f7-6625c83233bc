using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Document
    {
        public int Id { get; set; }

        // Foreign Key
        public int LoanApplicantId { get; set; }

        public string DocumentType { get; set; }

        public byte[] DocumentUpload { get; set; }

        public LoanApplicant LoanApplicants { get; set; }

    }
}