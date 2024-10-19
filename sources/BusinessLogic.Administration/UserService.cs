using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
using Data.Models.Export;
using Data.Models.Import;
using Newtonsoft.Json;

namespace BusinessLogic.Administration
{
    public class UserService : BusinessLogicBase, IUserService
    {
        public UserService(IApplicationUnitOfWork applicationUnitOfWork) : base(applicationUnitOfWork)
        {


        }

        public async Task<UserProfileExportModel?> GetProfileData()
        {
            try
            {
                var profile = await UnitOfWork.UserRepository.GetByIdAsync(CurrentUser.Id);

                if (profile == null)
                {
                    await UnitOfWork.LogRepository.AddAsync(new LogMessage
                    {
                        Trigger = nameof(UserService),
                        Message = "Could not find user profile!",
                        ExceptionJson = string.Empty,
                        TimeStamp = DateTime.Now
                    });

                    await UnitOfWork.SaveChanges();

                    return new UserProfileExportModel { ContactData = new ContactData() };
                }

                await LoadContactData(profile.ContactId);

                return new UserProfileExportModel
                {
                    FirstName = profile.FirstName,
                    LastName = profile.LastName,
                    UserName = profile.UserName,
                    Email = profile.Email,
                    DateOfBirth = profile.DateOfBirth,
                    ContactData = profile.Contact != null ? new ContactData
                    {
                        Street = profile.Contact.Street,
                        HouseNumber = profile.Contact.HouseNumber,
                        PostalCode = profile.Contact.PostalCode,
                        City = profile.Contact.City,
                        Country = profile.Contact.Country
                    } : new ContactData()
                };

            }
            catch (Exception exception)
            {
                await UnitOfWork.LogRepository.AddAsync(new LogMessage
                {
                    Trigger = nameof(UserService),
                    Message = "Could not load user profile!",
                    ExceptionJson = JsonConvert.SerializeObject(exception),
                    TimeStamp = DateTime.Now
                });

                await UnitOfWork.SaveChanges();

                return new UserProfileExportModel { ContactData = new ContactData()};
            }
        }

        public async Task<bool> UpdateProfile(UserProfile profile)
        {
            try
            {
                var user = await UnitOfWork.UserRepository.GetByIdAsync(profile.Id);

                if (user == null)
                {
                    await UnitOfWork.LogRepository.AddAsync(new LogMessage
                    {
                        Trigger = nameof(UserService),
                        Message = "Update user profile failed!",
                        ExceptionJson = "",
                        TimeStamp = DateTime.Now
                    });

                    await UnitOfWork.SaveChanges();

                    return false;
                }

                var profileChanged = false;

                if (user.ContactId != null && user.Contact != null)
                {
                    await LoadContactData(user.ContactId);

                    user.Contact.Street = profile.ContactData.Street;
                    user.Contact.HouseNumber = profile.ContactData.HouseNumber;
                    user.Contact.PostalCode = profile.ContactData.PostalCode;
                    user.Contact.City = profile.ContactData.City;
                    user.Contact.Country = profile.ContactData.Country;

                    profileChanged = true;
                }
                else
                {
                    user.Contact = new Contact
                    {
                        Street = profile.ContactData.Street,
                        HouseNumber = profile.ContactData.HouseNumber,
                        PostalCode = profile.ContactData.PostalCode,
                        City = profile.ContactData.City,
                        Country = profile.ContactData.Country,
                    };

                    profileChanged = true;
                }

                if (profileChanged)
                {
                    await UnitOfWork.SaveChanges();
                }

                return true;
            }
            catch (Exception exception)
            {
                await UnitOfWork.LogRepository.AddAsync(new LogMessage
                {
                    Trigger = nameof(UserService),
                    Message = "Update user profile failed!",
                    ExceptionJson = JsonConvert.SerializeObject(exception),
                    TimeStamp = DateTime.Now
                });

                await UnitOfWork.SaveChanges();

                return false;
            }
        }

        private async Task LoadContactData(int? contactId)
        {
            if (contactId == null)
            {
                return;
            }

            await UnitOfWork.ContactRepository.GetByIdAsync((int)contactId);
        }
    }
}
