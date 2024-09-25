using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
using Data.Models.Import;
using Microsoft.EntityFrameworkCore.Storage.Json;
using Newtonsoft.Json;
using System.Diagnostics;

namespace BusinessLogic.Administration
{
    public class UserRegistrationService : IUserRegistrationService
    {
        private readonly IApplicationUnitOfWork _unitOfWork;
        public UserRegistrationService(IApplicationUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> RegisterUser(UserRegistration userRegistration)
        {
            try
            {
                var existingUsers = await _unitOfWork.UserRepository.GetAllAsyncBy(x => x.Email == userRegistration.Email);

                if (!existingUsers.Any())
                {
                    var salt = Guid.NewGuid();

                    var securedPassword = Helpers.GetSecuredPassword(userRegistration.Password, salt);

                    var newUser = new AppUser
                    {
                        FirstName = userRegistration.FirstName,
                        LastName = userRegistration.LastName,
                        Email = userRegistration.Email,
                        DateOfBirth = userRegistration.DateOfBirth,
                        Credentials = new UserCredentials
                        {
                            Password = securedPassword,
                            Salt = salt.ToString()
                        },
                        IsActive = true,
                        CreatedAt = DateTime.Now.ToString("yyyy-MM-dd"),
                        CreatedBy = "System",
                        UpdatedAt = DateTime.Now.ToString("yyyy-MM-dd"),
                        UpdatedBy = "System",
                    };

                    var userId = await _unitOfWork.UserRepository.AddAsync(newUser);

                    await _unitOfWork.SaveChanges();

                    return userId != null;
                }

                return true;
            }
            catch (Exception exception)
            {
                Debug.WriteLine(exception.Message);
                
                await _unitOfWork.LogRepository.AddAsync(new LogMessage
                {
                    Trigger = nameof(UserRegistrationService),
                    Message = "Register user failed!",
                    ExceptionJson = JsonConvert.SerializeObject(exception),
                    TimeStamp = DateTime.Now
                });

                await _unitOfWork.SaveChanges();

                return false;
            }
        }

        public async Task<bool> UnRegisterUser(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
