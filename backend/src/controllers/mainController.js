const schemes = require("../data/data.json");
const axios = require("axios");

exports.getRecommendations = async (req, res) => {
    try {
        const user = req.body;

        if (!user || user == undefined) res.status(404).json({message: 'request body cannot be empty'})

        const filteredSchemes = schemes.filter((scheme) => {

            if (scheme.incomeLimit && user.annualIncome > scheme.incomeLimit)
                return false;

            if (scheme.minAge && user.age < scheme.minAge)
                return false;

            if (
                scheme.occupation &&
                !scheme.occupation.includes("All") &&
                !scheme.occupation.includes(user.occupation)
            )
                return false;

            return true;
        });

        const scoredSchemes = await Promise.all(
            filteredSchemes.map(async (scheme) => {

                const mlInput = {
                    income: user.annualIncome,
                    age: user.age,
                    occupation: user.occupation_code,
                    category: user.category_code,
                    homeLoan: user.hasHomeLoan,
                    agriLand: user.hasAgriculturalLand,
                    business: user.hasBusiness,

                    scheme_incomeLimit: scheme.incomeLimit || 0,
                    scheme_sector: scheme.sector_code || 0,
                    scheme_minAge: scheme.minAge || 0
                };

                const response = await axios.post(
                    "http://localhost:5000/predict",
                    mlInput
                );

                return {
                    ...scheme,
                    eligibilityScore: (response.data.eligibility_score * 100).toFixed(2)
                };
            })
        );

        scoredSchemes.sort((a, b) => b.eligibilityScore - a.eligibilityScore);

        res.json({
            success: true,
            recommendedSchemes: scoredSchemes
        });
    } catch (error) {
        console.error("Error in getRecommendations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};  