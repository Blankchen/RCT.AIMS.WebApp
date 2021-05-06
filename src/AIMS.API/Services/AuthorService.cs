using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Repositories;
using AIMS.API.Domain.Services;
using AIMS.API.ViewModels;
using AIMS.API.Utilities;

namespace AIMS.API.Services {
    public class AuthorService : IAuthorService {
        private readonly IAuthorRepository _authorRepository;
        private readonly IUnitOfWork _unitOfWork;

        public AuthorService (IAuthorRepository authorRepository, IUnitOfWork unitOfWork) {
            _authorRepository = authorRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<Author>> ListAsync () {
            return await this._authorRepository.ListAsync ();
        }

        public async Task<Author> FindByIdAsync (int id) {
            return await this._authorRepository.FindByIdAsync (id);
        }

         public async Task<string> SaveAsync (Author author) {
            try {
                await _authorRepository.AddAsync (author);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Saved;;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.SavedWarning}: {ex.Message}";;
            }
        }

        public async Task<string> UpdateAsync (Author author) {
            try {
                await _authorRepository.Update (author);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Saved;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.SavedWarning}: {ex.Message}";;
            }
        }
        public async Task<string> DeleteAsync (int id) {
            try {
                await _authorRepository.Remove (id);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Deleted;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.DeletedWarning}: {ex.Message}";
            }
        }
    }
}