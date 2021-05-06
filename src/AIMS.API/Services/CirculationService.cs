using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AIMS.API.Domain.Models;
using AIMS.API.Domain.Repositories;
using AIMS.API.Domain.Services;
using AIMS.API.Persistence.Contexts;
using AIMS.API.Utilities;
using AIMS.API.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace AIMS.API.Services {
    public class CirculationService : ICirculationService {
        private readonly ICirculationRepository _circulationRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CirculationService (ICirculationRepository circulationRepository, IUnitOfWork unitOfWork) {
            _circulationRepository = circulationRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<vmAssetIssuereturn>> getReturnAll () {
            return await _circulationRepository.getReturnAll ();
        }
        public async Task<vmAssetIssuereturn> getReturnByRfid (string rfid) {
            return await _circulationRepository.getReturnByRfid (rfid);
        }
        public async Task<string> returnAsset (vmAssetIssuereturn model) {
            try {
                await _circulationRepository.returnAsset (model);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Saved;;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.SavedWarning}: {ex.Message}";;
            }
        }
        public async Task<IEnumerable<Asset>> getIssueById (int id) {
            return await _circulationRepository.getIssueById (id);
        }
        public async Task<IEnumerable<vmAssetIssuereturn>> getIssueAll () {
            return await _circulationRepository.getIssueAll ();
        }
        public async Task<IEnumerable<vmAssetIssuereturn>> getIssueByRfid (string rfid) {
            return await _circulationRepository.getIssueByRfid (rfid);
        }
        public async Task<IEnumerable<vmAsset>> getAllAsset () {
            return await _circulationRepository.getAllAsset ();
        }
        public async Task<string> issueAsset (vmAssetIssuereturn model) {
            try {
                _circulationRepository.issueAsset (model);
                await _unitOfWork.CompleteAsync ();

                return MessageConstants.Saved;;
            } catch (Exception ex) {
                // Do some logging stuff
                return $"{MessageConstants.SavedWarning}: {ex.Message}";;
            }
        }

    }
}