using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Repositories;
using AIMS.API.Domain.Services;
using AIMS.API.Utilities;
using AIMS.API.ViewModels;

namespace AIMS.API.Services {
    public class AssetService : IAssetService {
        private readonly IAssetRepository _assetRepository;
        private readonly IUnitOfWork _unitOfWork;

        public AssetService (IAssetRepository assetRepository, IUnitOfWork unitOfWork) {
            _assetRepository = assetRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<vmAsset>> ListAsync () {
            return await this._assetRepository.ListAsync ();
        }
        public async Task<Asset> FindByIdAsync (int id) {
            return await this._assetRepository.FindByIdAsync (id);
        }
        public async Task<Asset> FindByRfidAsync (string rfid) {
            return await this._assetRepository.FindByRfidAsync (rfid);
        }
        public async Task<string> SaveAsync (Asset asset) {
            try {
                await _assetRepository.AddAsync (asset);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Saved;;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.SavedWarning}: {ex.Message}";;
            }
        }

        public async Task<string> UpdateAsync (Asset asset) {
            try {
                await _assetRepository.Update (asset);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Saved;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.SavedWarning}: {ex.Message}";;
            }
        }
        public async Task<string> DeleteAsync (int id) {
            try {
                await _assetRepository.Remove (id);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Deleted;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.DeletedWarning}: {ex.Message}";
            }
        }

    }
}