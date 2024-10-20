using BusinessLogic.Shared;
using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
using Data.Models.Enums;
using Newtonsoft.Json;
using System;

namespace BusinessLogic.Shared
{
    public abstract class BusinessLogicBase
    {
        private readonly ClaimsAccessor _claimsAccessor;
        private readonly AppUser _currentUser;
        private readonly IApplicationUnitOfWork _unitOfWork;

        public IApplicationUnitOfWork UnitOfWork => _unitOfWork;
        public AppUser CurrentUser => _currentUser;

        protected BusinessLogicBase(IApplicationUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _claimsAccessor = new ClaimsAccessor();

            _currentUser = LoadCurrentUserFromClaims();
        }

        protected async Task LogMessage(LogMessage message)
        {
            await _unitOfWork.LogRepository.AddAsync(message);

            await _unitOfWork.SaveChanges();
        }

        public async Task<UserSettings?> LoadUserSettings(int userId, SettingsTypeEnum settingsType)
        {
            var settingsEntities = await _unitOfWork.UserSettingsRepository.GetAllAsyncBy(x => x.UserId == userId && x.SettingsType == settingsType);

            if (!settingsEntities.Any() || settingsEntities.Count > 1)
            {
                return null;
            }

            var selectedEntity = settingsEntities.First();

            return selectedEntity;
        }

        public async Task SaveUserSettings(UserSettings settings)
        {
            await _unitOfWork.UserSettingsRepository.Update(settings);

            await _unitOfWork.SaveChanges();
        }

        private AppUser LoadCurrentUserFromClaims()
        {
            var user = new AppUser
            {
                Id = _claimsAccessor.GetClaimsValue<int>("UserId"),
                FirstName = _claimsAccessor.GetClaimsValue<string>("FirstName"),
                LastName = _claimsAccessor.GetClaimsValue<string>("LastName"),
                Email = _claimsAccessor.GetClaimsValue<string>("Email"),
                IsActive = bool.Parse(_claimsAccessor.GetClaimsValue<string>("IsActive")),
            };

            var contactIdClaimValue = _claimsAccessor.GetClaimsValue<int?>("ContactId");

            if(contactIdClaimValue != null)
            {
                user.ContactId = contactIdClaimValue;
            }
            var credentialIdClaimValue = _claimsAccessor.GetClaimsValue<int?>("CrendentialsId");

            if (credentialIdClaimValue != null)
            {
                user.ContactId = credentialIdClaimValue;
            }
           
            return user;
        }
    }
}

