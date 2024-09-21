using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
using Data.Models.Export;
using Data.Models.Import;
using Newtonsoft.Json;
using System.Diagnostics;

namespace BusinessLogic.Administration
{
    public class UserLoginService : IUserLoginService
    {
        private readonly IApplicationUnitOfWork _unitOfWork;
        public UserLoginService(IApplicationUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<UserExportModel?> Login(UserLogin userLogin)
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

                    if (user.IsActive && user.Credentials != null)
                    {
                        var securedPassword = Helpers.GetSecuredPassword(userLogin.Password, new Guid(user.Credentials.Salt));

                        if (securedPassword == user.Credentials.Password)
                        {
                            return new UserExportModel
                            {
                                FirstName = user.FirstName,
                                LastName = user.LastName,
                                UserName = user.UserName,
                                DisplayName = user.DisplayName,
                                Email = user.Email,
                                DateOfBirth = user.DateOfBirth,
                                IsActive = user.IsActive,
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

                            await _unitOfWork.SaveChanges(null);
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

                await _unitOfWork.SaveChanges(null);

                return null;
            }
        }

        private async Task TryLoadCredentials(int crendentialsId)
        {
            await _unitOfWork.UserCredentialsRepository.GetByIdAsync(crendentialsId);
        }
    }
}
