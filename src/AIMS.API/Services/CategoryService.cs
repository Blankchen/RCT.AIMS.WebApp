using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Repositories;
using AIMS.API.Domain.Services;
using AIMS.API.Utilities;
using AIMS.API.ViewModels;

namespace AIMS.API.Services {
    public class CategoryService : ICategoryService {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CategoryService (ICategoryRepository categoryRepository, IUnitOfWork unitOfWork) {
            _categoryRepository = categoryRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Category>> ListAsync () {
            return await this._categoryRepository.ListAsync ();
        }
        public async Task<Category> FindByIdAsync (int id) {
            return await this._categoryRepository.FindByIdAsync (id);
        }
        public async Task<string> SaveAsync (Category category) {
            try {
                await _categoryRepository.AddAsync (category);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Saved;;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.SavedWarning}: {ex.Message}";;
            }
        }

        public async Task<string> UpdateAsync (Category category) {
            try {
                await _categoryRepository.Update (category);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Saved;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.SavedWarning}: {ex.Message}";;
            }
        }
        public async Task<string> DeleteAsync (int id) {
            try {
                await _categoryRepository.Remove (id);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Deleted;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.DeletedWarning}: {ex.Message}";
            }
        }

    }
}