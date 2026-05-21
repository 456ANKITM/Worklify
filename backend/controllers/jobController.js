import Client from "../models/Client.js";
import Freelancer from "../models/Freelancer.js";
import Job from "../models/Job.js";
import Proposal from "../models/Proposal.js";

export const postJob = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only Clients Can post the jobs",
      });
    }

    const {
      title,
      description,
      keyResponsibilities,
      requirements,
      niceToHave,
      category,
      skillsRequired,
      budget,
      tags,
    } = req.body;

    if (!title || !description || !category || !budget) {
      return res.status(400).json({
        success: false,
        message: "Title, description, category and budget are",
      });
    }

    const client = await Client.findOne({ userId });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client Profile not found",
      });
    }

    const job = await Job.create({
      clientId: client._id,
      title,
      description,
      keyResponsibilities: keyResponsibilities || [],
      requirements: requirements || [],
      niceToHave: niceToHave || [],
      category,
      skillsRequired: skillsRequired || [],
      budget,
      tags: tags || [],
    });

    client.totalJobsPosted += 1;

    await client.save();

    return res.status(201).json({
      success: true,
      message: "Job Posted Successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" }).populate(
      "clientId",
      "clientName profileImage isVerified",
    );

    return res.status(200).json({
      success: true,
      message: "Open Jobs fetched Sucessfully",
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const searchJobs = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query (q) is required",
      });
    }
    const jobs = await Job.find({
      status: "open",
      $or: [
        {
          title: { $regex: q, $options: "i" },
        },
        {
          description: { $regex: q, $options: "i" },
        },
        {
          category: { $regex: q, $options: "i" },
        },
        {
          skillsRequired: { $in: [new RegExp(q, "i")] },
        },
      ],
    })
      .populate("clientId", "clientName profileImage isVerified")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getJobsBasedOnProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: "Freelancer Not found",
      });
    }

    const freelancerSkills = freelancer.skills || [];
    const freelancerCategories = freelancer.category || [];

    const jobs = await Job.find({
      status: "open",
      $or: [
        // skill match
        {
          skillsRequired: { $in: freelancerSkills },
        },
        // category match
        {
          category: { $in: freelancerCategories },
        },
        // tag match
        {
          tags: { $in: freelancerSkills },
        },
      ],
    })
      .populate("clientId", "clientName profileImage isVerified")
      .sort({ createdAt: -1 });

    const filteredJobs = jobs.filter((job) => {
      const skillMatch = job.skillsRequired?.some((skill) =>
        freelancerSkills.includes(skill),
      );
      const categoryMatch = freelancerCategories.includes(job.category);
      const tagMatch = job.tags?.some((tag) => freelancerSkills.includes(tag));

      return skillMatch || categoryMatch || tagMatch;
    });

    return res.status(200).json({
      success: true,
      message: "Matched Jobs Fetched Successfully",
      data: filteredJobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getJobsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }
    const jobs = await Job.find({ category, status: "open" })
      .populate("clientId", "clientName profileImage isVerified")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Job Fetched successfully",
      totalJobs: jobs.length,
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const submitProposal = async (req, res) => {
  try {
    const userId = req.user._id;

    if(req.user.role !== "freelancer") {
      return res.status(403).json({
        success:false, 
        message:"Only freelancers can submit proposals"
      })
    }

    const {jobId} = req.params;
    const {coverLetter, proposedBudget, estimatedTime} = req.body;

    if(!coverLetter || !estimatedTime || !proposedBudget) {
      return res.status(400).json({
        success:false, 
        message:"All fields are required"
      })
    }

    const freelancer = await Freelancer.findOne({userId});
    if(!freelancer) {
      return res.status(404).json({
        success:false, 
        message:"Freelancer not found"
      })
    }

    const job = await Job.findById(jobId);

    if(!job) {
      return res.status(404).json({
        success:false, 
        message:"Job Not Found"
      })
    }

    const existingProposal = await Proposal.findOne({jobId, freelancerId:freelancer._id})
    if(existingProposal) {
      return res.status(400).json({
        success:false, 
        message:"You have already submitted the proposal for this job"
      })
    }

    const proposal = await Proposal.create({
      jobId,
      freelancerId:freelancer._id, 
      coverLetter, 
      proposedBudget,
      estimatedTime, 
      status:"pending"
    });

    return res.status(201).json({
      success:true,
      message:"Proposal Submitted successfully",
      data: proposal,
    })
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
