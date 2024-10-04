using BusinessLogic.Shared.Interfaces;
using Data.Models.Export;
using Data.Models.Import;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json.Nodes;

namespace Service.Api.Health
{
    [Authorize]
    public class HealthDataImportController : ApiControllerBase
    {
        private IHealthModule _healthModule;

        public HealthDataImportController(IHealthModule healthModule)
        {
            _healthModule = healthModule;
        }

        [HttpPost(Name = "Import")]
        public async Task<bool> Import([FromBody] HealthDataImport importModel)
        {
            return await _healthModule.ImportHealthData(importModel);
        }

      
    }
}
