﻿using Data.Models.Interfaces;

namespace Data.Models.Export
{
    public class UserExportModel : IUser
    {
        public string FirstName { get ; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; }
    }
}
