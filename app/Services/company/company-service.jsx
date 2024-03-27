import {serviceHost } from '../../common/const';
import ServiceRequest from  '../../utils/service-request';
import Company from '../../models/company/company-model';

export const getAllCompanies = async () => {
    try {
      const companies = await Company.find();
      return { response: companies, err: null };
    } catch (err) {
      console.error('Error retrieving companies:', err);
      return { response: null, err };
    }
  };

  export async function addCompany(companyName, companyCode, country, address, contact) {
    try {
        const newCompany = await Company.create({
            companyName,
            companyCode,
            country,
            address,
            contact,
            isDeleted: false, 
        });
        
        return { response: newCompany, err: null };
    } catch (error) {
        console.error("Error saving company:", error);
        return { response: null, err: error };
    }
}

  export const deleteCompany = async (companyId) => {
    try {
      const result = await Company.deleteOne({ _id: companyId });
      if (result.deletedCount === 0) {
        throw new Error('Company not found');
      }
      return { response: result, err: null };
    } catch (err) {
      console.error('Error deleting company:', err);
      return { response: null, err };
    }
  };

  export const getCompanyById = async (companyId) => {
    try {
      const company = await Company.findById(companyId);
      return { response: company, err: null };
    } catch (err) {
      console.error('Error retrieving company by ID:', err);
      return { response: null, err };
    }
  };

  export const editCompany = async (companyId, updatedCompany) => {
    try {
      const result = await Company.findByIdAndUpdate(companyId, updatedCompany, { new: true });
      if (!result) {
        throw new Error('Company not found');
      }
      return { response: result, err: null };
    } catch (err) {
      console.error('Error updating company:', err);
      return { response: null, err };
    }
  };
