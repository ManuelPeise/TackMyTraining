using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
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
       
        private AppUser LoadCurrentUserFromClaims()
        {
            return new AppUser
            {
                Id = _claimsAccessor.GetClaimsValue<int>("UserId"),
                FirstName = _claimsAccessor.GetClaimsValue<string>("FirstName"),
                LastName = _claimsAccessor.GetClaimsValue<string>("LastName"),
                Email = _claimsAccessor.GetClaimsValue<string>("Email"),

            };
        }
    }
}
