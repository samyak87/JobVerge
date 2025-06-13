import jobsModel from "../models/jobsModel.js";

export const createJobsController = async (req, res,next) => { 
    try {
        const { company, position } = req.body;
        if (!company || !position) {
            return res.status(400).json({ message: "Company and position are required" });
        }
        req.body.createdBy = req.user.name;
        const job= await jobsModel.create(req.body);
        res.status(201).json({ message: "Job created successfully", job });
    
    } catch (error) {
        res.status(500).json({ message: "Error creating job", error: error.message });
    
}
};

export const getJobsController = async (req, res,next) => {
    try {
        // fetch all jobs

        const jobs = await jobsModel.find({ createdBy: req.user.name }).sort({ createdAt: -1 });
        res.status(200).json({ message: "Jobs fetched successfully", jobs });
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error: error.message });
    }
}
