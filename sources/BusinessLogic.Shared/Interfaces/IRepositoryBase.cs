using Data.Models.Entities;
using System.Linq.Expressions;

namespace BusinessLogic.Shared.Interfaces
{
    public interface IRepositoryBase<T> : IDisposable where T : AEntityBase
    {
        Task<ICollection<T>> GetAllAsync();
        Task<T?> GetByIdAsync(int id);
        Task<ICollection<T>> GetAllAsyncBy(Expression<Func<T, bool>> expression);
        Task<int?> AddAsync(T entity);
        Task<bool> Update(T entity);
        void Delete(int id);
    }
}
