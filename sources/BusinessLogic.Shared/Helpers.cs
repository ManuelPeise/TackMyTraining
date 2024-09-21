using System.Text;

namespace BusinessLogic.Shared
{
    public static class Helpers
    {
        public static string GetSecuredPassword(string password, Guid salt)
        {
            var bytes = Encoding.UTF8.GetBytes(password).ToList();

            bytes.AddRange(Encoding.UTF8.GetBytes(salt.ToString()));

            return Convert.ToBase64String(bytes.ToArray());
        }
    }
}
