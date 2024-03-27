import Token from "../../models/Token/token"
import User from "../../models/user/user-model"
import Company from "../../models/company/company-model"
export const getActiveUsersReport = async (reportParams, projectId) => {
    try {
        const tokenResults = await Token.find({}, { userId: 1 });

        const userIds = tokenResults.map(token => token.userId);

        const users = await User.find(
            {
                _id: { $in: userIds },
                isDeleted: false
            },
            { name: 1, email: 1, companyId: 1 }
        );

        const companyIds = users
            .filter(user => user.companyId !== "")
            .map(user => user.companyId);

        const companies = await Company.find(
            {
                _id: { $in: companyIds },
                isDeleted: false
            },
            { companyName: 1 }
        );

        // Mapping user data with their respective company names
        const resultStore = users.reduce((accumulator, user) => {
            if (user.companyId !== "") {
                const company = companies.find(company => user.companyId === company._id.toString());
                if (company) {
                    accumulator.push({
                        name: user.name,
                        email: user.email,
                        companyName: company.companyName
                    });
                }
            }
            return accumulator;
        }, []);

        return { response: resultStore, err: null };
    } catch (err) {
        console.error('Error fetching active users report:', err);
        return { response: null, err };
    }
};

