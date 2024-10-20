﻿using Data.Models.Export;
using Data.Models.Import;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IUserService
    {
        Task<UserProfileExportModel?> GetProfileData();
        Task<bool> UpdateProfileData(ProfileImportModel profileImport);
        Task<bool> UpdateContactData(ContactDataImportModel contactDataImport);

    }
}
