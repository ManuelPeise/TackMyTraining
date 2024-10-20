using System.Security.Claims;

namespace BusinessLogic.Shared
{
    public class ClaimsAccessor
    {

        private Dictionary<string, string> _claimsDictionary;

        public Dictionary<string, string> Claims => _claimsDictionary;

        public ClaimsAccessor()
        {
            _claimsDictionary = new Dictionary<string, string>();
            LoadClaimsData();
        }

        public T? GetClaimsValue<T>(string key)
        {
            if (_claimsDictionary.ContainsKey(key))
            {
                var selectedClaimField = _claimsDictionary[key];
                var type = typeof(T);

                if(selectedClaimField == null) 
                { 
                    return default(T?);
                }

                if (type == typeof(int))
                {
                    return (T)Convert.ChangeType(int.Parse(selectedClaimField), type);
                }

                if (type == typeof(string))
                {
                    return (T)Convert.ChangeType(selectedClaimField, type);
                }

                if (type == typeof(Guid))
                {
                    return (T)Convert.ChangeType(new Guid(selectedClaimField), type);
                }

                if (type == typeof(DateTime))
                {
                    return (T)Convert.ChangeType(DateTime.Parse(selectedClaimField), type);
                }

            }

            return default;
        }

        private void LoadClaimsData()
        {
            var claims = ClaimsPrincipal.Current?.Claims.ToList() ?? new List<Claim>();

            foreach (var claim in claims)
            {
                if (!_claimsDictionary.ContainsKey(claim.Type))
                {
                    _claimsDictionary.Add(claim.Type, claim.Value);
                }
            }
        }

    }
}
