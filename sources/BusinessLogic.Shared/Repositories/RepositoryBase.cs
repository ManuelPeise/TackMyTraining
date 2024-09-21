using BusinessLogic.Shared.Interfaces;
using Data.Models.Entities;
using Data.TrainingContext;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BusinessLogic.Shared.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : AEntityBase
    {
        private readonly TrainingDbContext _context;
        private bool disposedValue;
        public RepositoryBase(TrainingDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<T>> GetAllAsync()
        {
            var table = _context.Set<T>();

            return await table.ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            var table = _context.Set<T>();

            return await table.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ICollection<T>> GetAllAsyncBy(Expression<Func<T, bool>> expression)
        {
            var table = _context.Set<T>();

            return await table.Where(expression).ToListAsync();
        }

        public async Task<int?> AddAsync(T entity)
        {
            var table = _context.Set<T>();

            var existing = await table.FirstOrDefaultAsync(x => x.Id == entity.Id);

            if (existing == null)
            {
                var result = await table.AddAsync(entity);

                return await Task.FromResult(entity.Id);
            }

            return null;
        }

        public async Task<bool> Update(T entity)
        {
            var table = _context.Set<T>();

            var existingEntity = table.Find(entity.Id);

            if (existingEntity != null)
            {
                existingEntity = entity;

                table.Update(existingEntity);

                return true;
            }

            return false;
        }

        public void Delete(int id)
        {
            var table = _context.Set<T>();

            var entityToDelete = table.FirstOrDefault(x => x.Id == id);

            if (entityToDelete != null)
            {
                table.Remove(entityToDelete);
            }
        }

        #region dispose
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _context.Dispose();
                }

                disposedValue = true;
            }
        }
        public void Dispose()
        {
            // Ändern Sie diesen Code nicht. Fügen Sie Bereinigungscode in der Methode "Dispose(bool disposing)" ein.
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
