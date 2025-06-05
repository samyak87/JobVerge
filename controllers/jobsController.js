export const jobsController = async (req, res) => { 
    try {
        // Simulate fetching jobs from a database
        const jobs = [
        { id: 1, position: "Software Engineer", company: "Tech Corp", workLocation: "New York" },
        { id: 2, position: "Data Scientist", company: "Data Inc", workLocation: "San Francisco" },
        ];
        
        res.status(200).json({
        success: true,
        data: jobs,
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Server Error",
        });
    }
}
