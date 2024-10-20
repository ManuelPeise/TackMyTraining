using Data.Models.Export;
using Data.Models.Interfaces;

namespace Data.Models.Import
{
    public class UserProfile: IUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string DateOfBirth { get; set; }
        public ContactData ContactData { get; set; } = new ContactData();
    }
}
