import mongoose from "mongoose";
import jobsModel from "../models/jobsModel.js";

export const createJobsController = async (req, res,next) => { 
    try {
        const { company, position } = req.body;
        if (!company || !position) {
            return res.status(400).json({ message: "Company and position are required" });
        }
        req.body.createdBy = req.user.userId;
        const job= await jobsModel.create(req.body);
        res.status(201).json({ message: "Job created successfully", job });
    
    } catch (error) {
        res.status(500).json({ message: "Error creating job", error: error.message });
    
}
};

export const getJobsController = async (req, res,next) => {
    try {
        // fetch all jobs

        const jobs = await jobsModel.find({ createdBy: req.user.userId}).sort({ createdAt: -1 });
        res.status(200).json({ message: "Jobs fetched successfully", jobs });
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error: error.message });
    }
}


export const updateJobController = async (req, res,next) => {
      const { id } = req.params;
      const { company, position } = req.body;
        if (!company || !position) {
            return res.status(400).json({ message: "Company and position are required" });
        }

        try {
            const job = await jobsModel.findOne({ _id: id });          
            if (!job) {
                return res.status(404).json({ message: "Job not found" });
            }   
            if( job.createdBy.toString() === req.user.userId) {
                return res.status(403).json({ message: "You are not authorized to update this job" });
            }

            const updatedJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
            
            res.status(200).json({ message: "Job updated successfully", updatedJob });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating job", error: error.message });
        }
}


export const deleteJobController = async (req, res,next) => {
    const { id } = req.params;

    try {
        const job = await jobsModel.findOne({ _id: id });
        if (!job) {
            next({ status: 404, message: "Job not found" });
        }   
        if( job.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this job" });
        }
        await jobsModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Job deleted successfully" });  
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting job", error: error.message });
    }   
}



export const jobStatsController = async (req, res) => {
    try {
        const stats = await jobsModel.aggregate([
            { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId)} },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
           
        ]); 

        
        res.status(200).json({ message: "Job stats fetched successfully", stats });
    } catch (error) {
        res.status(500).json({ message: "Error fetching job stats", error: error.message });
    }
}
