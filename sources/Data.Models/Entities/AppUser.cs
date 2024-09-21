using System.ComponentModel.DataAnnotations.Schema;
using Data.Models.Interfaces;

namespace Data.Models.Entities
{
    public class AppUser: AEntityBase, IUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string DisplayName => $"{FirstName}.{LastName}";
        public string Email { get; set; } = string.Empty;
        public string UserName => Email;
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; }
        public int CrendentialsId { get; set; }
        [ForeignKey(nameof(CrendentialsId))]
        public UserCredentials Credentials { get; set; } = new UserCredentials();

    }
}
