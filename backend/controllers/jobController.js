import Agreement from "../models/Agreement.js";
import Client from "../models/Client.js";
import Freelancer from "../models/Freelancer.js";
import Job from "../models/Job.js";
import Proposal from "../models/Proposal.js";
import mongoose from "mongoose";
import { createNotification } from "../utils/createNotification.js";



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
        message: "Title, description, category and budget are required",
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
    const jobs = await Job.find({ status: "open" })
      .populate("clientId", "clientName profileImage isVerified")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Open Jobs fetched Successfully",
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

/*
|--------------------------------------------------------------------------
| GET JOBS BASED ON PROFILE
|--------------------------------------------------------------------------
*/

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
        {
          skillsRequired: { $in: freelancerSkills },
        },
        {
          category: { $in: freelancerCategories },
        },
        {
          tags: { $in: freelancerSkills },
        },
      ],
    })
      .populate("clientId", "clientName profileImage isVerified")
      .sort({ createdAt: -1 });

    const filteredJobs = jobs.filter((job) => {
      const skillMatch = job.skillsRequired?.some((skill) =>
        freelancerSkills.includes(skill)
      );

      const categoryMatch = freelancerCategories.includes(job.category);

      const tagMatch = job.tags?.some((tag) =>
        freelancerSkills.includes(tag)
      );

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

/*
|--------------------------------------------------------------------------
| GET JOBS BY CATEGORY
|--------------------------------------------------------------------------
*/

export const getJobsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const jobs = await Job.find({
      category,
      status: "open",
    })
      .populate("clientId", "clientName profileImage isVerified")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Job fetched successfully",
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

/*
|--------------------------------------------------------------------------
| SUBMIT PROPOSAL
|--------------------------------------------------------------------------
*/

export const submitProposal = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.role !== "freelancer") {
      return res.status(403).json({
        success: false,
        message: "Only freelancers can submit proposals",
      });
    }

    const { jobId } = req.params;
    const { coverLetter, proposedBudget, estimatedTime } = req.body;

    if (!coverLetter || !estimatedTime || !proposedBudget) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const freelancer = await Freelancer.findOne({ userId });

    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: "Freelancer not found",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }

    const client = await Client.findById(job.clientId);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const existingProposal = await Proposal.findOne({
      jobId,
      freelancerId: freelancer._id,
    });

    if (existingProposal) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted the proposal for this job",
      });
    }

    const proposal = await Proposal.create({
      jobId,
      freelancerId: freelancer._id,
      coverLetter,
      proposedBudget,
      estimatedTime,
      status: "pending",
    });

    // FIXED NOTIFICATION
    await createNotification({
      recipientId: client.userId,
      senderId: freelancer.userId,
      type: "proposal_submitted",
      title: "New Proposal Received",
      message: `${freelancer.freelancerName} has submitted a proposal for your job: ${job.title}`,
    });

    return res.status(201).json({
      success: true,
      message: "Proposal Submitted successfully",
      data: proposal,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL PROPOSALS FOR JOB
|--------------------------------------------------------------------------
*/

export const getAllProposalsForJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId } = req.params;

    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only Clients Can View the Proposals",
      });
    }

    const client = await Client.findOne({ userId });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client Profile not Found",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.clientId.toString() !== client._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to view the proposals",
      });
    }

    const proposals = await Proposal.find({ jobId })
      .populate({
        path: "freelancerId",
        select:
          "freelancerName professionalTitle profileImage skills averageRating certifications experience education isVerified reviews category",
      })
      .sort({ createdAt: -1 });

    const rankedProposals = proposals.map((proposal) => {
      const freelancer = proposal.freelancerId;

      let score = 0;

      const requiredSkills = job.skillsRequired || [];
      const freelancerSkills = freelancer.skills || [];

      const matchedSkills = requiredSkills.filter((skill) =>
        freelancerSkills.includes(skill)
      );

      score += matchedSkills.length * 15;
      score += freelancer.averageRating * 10;
      score += freelancer.certifications.length * 5;
      score += freelancer.experience.length * 8;
      score += freelancer.education.length * 3;

      if (freelancer.isVerified) {
        score += 20;
      }

      score += freelancer.reviews.length * 2;

      if (freelancer.category.includes(job.category)) {
        score += 40;
      }

      return {
        proposal,
        rankingScore: score,
        matchedSkillsCount: matchedSkills.length,
      };
    });

    rankedProposals.sort((a, b) => b.rankingScore - a.rankingScore);

    return res.status(200).json({
      success: true,
      message: "Ranked Proposals fetched successfully",
      totalProposals: rankedProposals.length,
      data: rankedProposals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



export const hireFreelancer = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = req.user._id;
    const { jobId, proposalId } = req.params;

    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only Client Can hire freelancers",
      });
    }

    const client = await Client.findOne({ userId });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const job = await Job.findById(jobId).session(session);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }

    if (job.clientId.toString() !== client._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to hire for this job",
      });
    }

    if (job.selectedFreelancer) {
      return res.status(400).json({
        success: false,
        message: "Freelancer already hired for this job",
      });
    }

    const selectedProposal = await Proposal.findById(proposalId).session(
      session
    );

    if (!selectedProposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found",
      });
    }

    if (selectedProposal.jobId.toString() !== jobId) {
      return res.status(400).json({
        success: false,
        message: "This proposal does not belong to this job",
      });
    }

    if (selectedProposal.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "This proposal cannot be hired",
      });
    }

    selectedProposal.status = "accepted";

    await selectedProposal.save({ session });

    await Proposal.updateMany(
      {
        jobId,
        _id: { $ne: proposalId },
      },
      {
        $set: {
          status: "rejected",
        },
      },
      { session }
    );

    job.selectedFreelancer = selectedProposal.freelancerId;
    job.status = "in-progress";

    await job.save({ session });

    const agreement = await Agreement.create(
      [
        {
          jobId: job._id,
          clientId: client.userId,
          freelancerId: selectedProposal.userId,
          proposalId: selectedProposal._id,
          status: "active",
        },
      ],
      { session }
    );

    await session.commitTransaction();

    // GET FREELANCER USER ID
    const freelancer = await Freelancer.findById(
      selectedProposal.freelancerId
    );

    // FIXED NOTIFICATION
    await createNotification({
      recipientId: freelancer.userId,
      senderId: client.userId,
      type: "freelancer_hired",
      title: "You got hired!",
      message: `${client.clientName} has hired you for the job: ${job.title}`,
    });

    return res.status(200).json({
      success: true,
      message: "Freelancer hired successfully",
      agreement: agreement[0],
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};



export const sendCompletionRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { agreementId } = req.params;
    const { message } = req.body;

    if (req.user.role !== "freelancer") {
      return res.status(403).json({
        success: false,
        message: "Only freelancers can send completion request",
      });
    }

    const agreement = await Agreement.findById(agreementId)
      .populate("freelancerId", "freelancerName userId")
      .populate("jobId", "title");

    if (!agreement) {
      return res.status(404).json({
        success: false,
        message: "Agreement not found",
      });
    }

    const client = await Client.findById(agreement.clientId);

    agreement.completionRequest = {
      status: "requested",
      message,
      requestedAt: new Date(),
    };

    await agreement.save();

    // FIXED NOTIFICATION
    await createNotification({
      recipientId: client.userId,
      senderId: agreement.freelancerId.userId,
      type: "completion_requested",
      title: "Work submitted for review",
      message: `${agreement.freelancerId.freelancerName} has sent a completion request for ${agreement.jobId.title}`,
    });

    return res.status(200).json({
      success: true,
      message: "Completion request sent successfully",
      data: agreement,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



export const approveCompletionRequest = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = req.user._id;
    const { agreementId } = req.params;

    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only Client Can approve Completion",
      });
    }

    const agreement = await Agreement.findById(agreementId)
      .populate("clientId", "clientName userId")
      .populate("jobId", "title")
      .session(session);

    if (!agreement) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Agreement not found",
      });
    }

    if (agreement.completionRequest.status !== "requested") {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "No Pending Completion request",
      });
    }

    agreement.completionRequest.status = "approved";
    agreement.status = "completed";

    await agreement.save({ session });

    await Job.findByIdAndUpdate(
      agreement.jobId,
      {
        $set: {
          status: "completed",
        },
      },
      { session }
    );

    await session.commitTransaction();

    const freelancer = await Freelancer.findById(agreement.freelancerId);

    // FIXED NOTIFICATION
    await createNotification({
      recipientId: freelancer.userId,
      senderId: agreement.clientId.userId,
      type: "completion_approved",
      title: "Project Completed",
      message: `${agreement.clientId.clientName} has approved your completion request for the job ${agreement.jobId.title}. The payment will be released soon.`,
    });

    return res.status(200).json({
      success: true,
      message: "Project Completed Successfully",
      data: agreement,
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};



export const rejectCompletionRequest = async (req, res) => {
  try {
    const userId = req.user._id;

    const { agreementId } = req.params;
    const { reason } = req.body;

    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only Client Can reject Completion",
      });
    }

    const agreement = await Agreement.findById(agreementId)
      .populate("clientId", "clientName userId")
      .populate("jobId", "title");

    if (!agreement) {
      return res.status(404).json({
        success: false,
        message: "Agreement not found",
      });
    }

    if (agreement.completionRequest.status !== "requested") {
      return res.status(400).json({
        success: false,
        message: "No Pending Completion request",
      });
    }

    agreement.completionRequest.status = "rejected";

    agreement.completionRequest.message =
      agreement.completionRequest.message +
      ` | Rejected Reason: ${reason}`;

    await agreement.save();

    const freelancer = await Freelancer.findById(agreement.freelancerId);

    // FIXED NOTIFICATION
    await createNotification({
      recipientId: freelancer.userId,
      senderId: agreement.clientId.userId,
      type: "completion_rejected",
      title: "Completion Request Rejected",
      message: `${agreement.clientId.clientName} has rejected your completion request for the job ${agreement.jobId.title}. Reason: ${reason}`,
    });

    return res.status(200).json({
      success: true,
      message: "Completion request rejected, project continues",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};