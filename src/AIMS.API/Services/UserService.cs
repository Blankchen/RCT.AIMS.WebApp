using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Repositories;
using AIMS.API.Domain.Services;
using AIMS.API.Utilities;
using AIMS.API.ViewModels;

namespace AIMS.API.Services {
    public class UserService : IUserService {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UserService (IUserRepository userRepository, IUnitOfWork unitOfWork) {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<vmUser>> ListAsync () {
            return await this._userRepository.ListAsync ();
        }
        public async Task<User> FindByIdAsync (int id) {
            return await this._userRepository.FindByIdAsync (id);
        }
        public async Task<User> FindByRfidAsync (string rfid) {
            return await this._userRepository.FindByRfidAsync (rfid);
        }
        public async Task<string> SaveAsync (User user) {
            try {
                await _userRepository.AddAsync (user);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Saved;;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.SavedWarning}: {ex.Message}";;
            }
        }

        public async Task<string> UpdateAsync (User user) {
            try {
                await _userRepository.Update (user);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Saved;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.SavedWarning}: {ex.Message}";;
            }
        }
        public async Task<string> DeleteAsync (int id) {
            try {
                await _userRepository.Remove (id);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Deleted;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.DeletedWarning}: {ex.Message}";
            }
        }
    }
}