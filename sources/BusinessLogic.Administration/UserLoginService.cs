using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
using Data.Models.Export;
using Data.Models.Import;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Security.Claims;


namespace BusinessLogic.Administration
{
    public class UserLoginService : IUserLoginService
    {
        private readonly IApplicationUnitOfWork _unitOfWork;
        public UserLoginService(IApplicationUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<UserExportModel?> Login(UserLogin userLogin, IConfiguration config)
        {
            try
            {
                var existingUsers = await _unitOfWork.UserRepository.GetAllAsyncBy(x => x.Email == userLogin.Email);

                if (existingUsers == null || !existingUsers.Any())
                {
                    return null;
                }

                if (existingUsers.Count == 1)
                {
                    var user = existingUsers.First();

                    await TryLoadCredentials(user.CrendentialsId);
                    await TryLoadContactData(user.ContactId);

                    if (user.IsActive && user.Credentials != null)
                    {
                        var securedPassword = Helpers.GetSecuredPassword(userLogin.Password, new Guid(user.Credentials.Salt));

                        if (securedPassword == user.Credentials.Password)
                        {
                            var tokenGenerator = new JwtTokenGenerator();

                            var (jwt, refreshToken) = tokenGenerator
                            .GenerateToken(config, LoadUserClaims(user), 100);

                            user.Credentials.JwT = jwt;
                            user.Credentials.RefreshToken = refreshToken;

                            await _unitOfWork.UserRepository.Update(user);
                            await _unitOfWork.SaveChanges();

                            return new UserExportModel
                            {
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                UserName = user.UserName,
                                DisplayName = user.DisplayName,
                                Email = user.Email,
                                DateOfBirth = user.DateOfBirth,
                                IsActive = user.IsActive,
                                JwtData = new JWTData
                                {
                                    JwtToken = jwt,
                                    RefreshToken = refreshToken,
                                },
                                ContactData = new ContactData
                                {
                                    Street = user.Contact?.Street ?? string.Empty,
                                    HouseNumber = user?.Contact?.HouseNumber ?? string.Empty,
                                    PostalCode = user?.Contact?.PostalCode ?? string.Empty,
                                    City = user?.Contact?.City ?? string.Empty,
                                    Country = user?.Contact?.Country ?? string.Empty,
                                }
                                
                            };
                        }
                        else
                        {
                            var failedLogins = user.Credentials.FailedLoginAttemts + 1;

                            if (failedLogins == 3)
                            {
                                user.IsActive = false;
                            }

                            user.Credentials.FailedLoginAttemts = failedLogins;

                            await _unitOfWork.UserRepository.Update(user);

                            await _unitOfWork.SaveChanges();
                        }
                    }
                    else
                    {
                        throw new Exception($"Login for user [{user.Id}] failed!");
                    }
                }

                return null;
            }
            catch (Exception exception)
            {
                Debug.WriteLine(exception.Message);

                await _unitOfWork.LogRepository.AddAsync(new LogMessage
                {
                    Trigger = nameof(UserLoginService),
                    Message = "Login user failed!",
                    ExceptionJson = JsonConvert.SerializeObject(exception),
                    TimeStamp = DateTime.Now
                });

                await _unitOfWork.SaveChanges();

                return null;
            }
        }

        private List<Claim> LoadUserClaims(AppUser account)
        {
            return new List<Claim>
            {
                new Claim("UserId", account.Id.ToString()),
                new Claim("Email",account.Email),
                new Claim("UserName", account.UserName),
                new Claim("FirstName", account.FirstName ?? ""),
                new Claim("LastName", account.LastName ?? ""),
            };
        }

        private async Task TryLoadCredentials(int crendentialsId)
        {
            await _unitOfWork.UserCredentialsRepository.GetByIdAsync(crendentialsId);
        }

        private async Task TryLoadContactData(int? contactId)
        {
            if(contactId == null)
            {
                return;
            }

            await _unitOfWork.ContactRepository.GetByIdAsync((int)contactId);
        }
    }
}
