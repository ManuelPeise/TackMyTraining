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
                    DateOfBirth = DateTime.Parse(profile.DateOfBirth).ToString("dd.MM.yyyy"),
                    ContactData = profile?.Contact != null ? new ContactData
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

                return new UserProfileExportModel { ContactData = new ContactData() };
            }
        }

        public async Task<bool> UpdateProfileData(ProfileImportModel profileImport)
        {

            try
            {
                var user = await UnitOfWork.UserRepository.GetByIdAsync(CurrentUser.Id);

                if (user == null)
                {
                    await UnitOfWork.LogRepository.AddAsync(new LogMessage
                    {
                        Trigger = nameof(UserService),
                        Message = "Update user profile data failed!",
                        ExceptionJson = "",
                        TimeStamp = DateTime.Now
                    });

                    await UnitOfWork.SaveChanges();

                    return false;
                }

                user.FirstName = profileImport.FirstName;
                user.LastName = profileImport.LastName;
                user.Email = profileImport.Email;

                var changesApplied = await UnitOfWork.UserRepository.Update(user);

                if (changesApplied)
                {
                    await UnitOfWork.SaveChanges();

                    return true;
                }
                
                return false;
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

        public async Task<bool> UpdateContactData(ContactDataImportModel contactDataImport)
        {
            try
            {
                if(CurrentUser.ContactId == null || CurrentUser.ContactId == -1)
                {
                    var user = await UnitOfWork.UserRepository.GetByIdAsync(CurrentUser.Id);

                    if (user == null)
                    {
                        await UnitOfWork.LogRepository.AddAsync(new LogMessage
                        {
                            Trigger = nameof(UserService),
                            Message = "Update contact data failed!",
                            ExceptionJson = "",
                            TimeStamp = DateTime.Now
                        });

                        await UnitOfWork.SaveChanges();

                        return false;
                    }

                    user.Contact = new Contact
                    {
                        Street = contactDataImport.Street,
                        HouseNumber = contactDataImport.HouseNumber,
                        PostalCode = contactDataImport.PostalCode,
                        City = contactDataImport.City,
                        Country = contactDataImport.Country,
                    };

                    var isUpdated = await UnitOfWork.UserRepository.Update(user);

                    if (isUpdated) {
                        await UnitOfWork.SaveChanges();

                        return true;
                    }

                    return false;
                }

                var contact = await UnitOfWork.ContactRepository.GetByIdAsync((int)CurrentUser.ContactId);

                if (contact == null)
                {
                    await UnitOfWork.LogRepository.AddAsync(new LogMessage
                    {
                        Trigger = nameof(UserService),
                        Message = "Could not find contact in database, update contact data failed!",
                        ExceptionJson = "",
                        TimeStamp = DateTime.Now
                    });

                    await UnitOfWork.SaveChanges();

                    return false;
                }

                contact.Street = contactDataImport.Street;
                contact.HouseNumber = contactDataImport.HouseNumber;
                contact.PostalCode = contactDataImport.PostalCode;
                contact.City = contactDataImport.City;
                contact.Country = contactDataImport.Country;


                var changesApplied = await UnitOfWork.ContactRepository.Update(contact);

                if (changesApplied)
                {
                    await UnitOfWork.SaveChanges();

                    return true;
                }

                return false;
            }
            catch (Exception exception)
            {
                await UnitOfWork.LogRepository.AddAsync(new LogMessage
                {
                    Trigger = nameof(UserService),
                    Message = "Update contact data failed!",
                    ExceptionJson = JsonConvert.SerializeObject(exception),
                    TimeStamp = DateTime.Now
                });

                await UnitOfWork.SaveChanges();

                return false;
            }
        }

        

        private async Task LoadContactData(int? contactId)
        {
            if (contactId == null || contactId == -1)
            {
                return;
            }

            await UnitOfWork.ContactRepository.GetByIdAsync((int)contactId);
        }
    }
}
