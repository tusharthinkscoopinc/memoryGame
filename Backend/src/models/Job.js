const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    generalDescription: { type: String, required: true },
    totalResourcesRequired: { type: Number, required: true },
    desiredStartDate: { type: Date },
    timeZone: { type: String },
    clientHours: {
        startTime: { type: String },
        endTime: { type: String }
    },
    languages: [{ type: String }],
    industry: { type: String, required: true },
    resourceTabs: [
        {
            roleTitle: { type: String, required: true },
            numberOfResources: { type: Number, required: true },
            primarySkills: [{ type: String }],
            experience: { type: String, enum: ['Entry', 'Mid', 'Senior', 'Manager Level'], required: true },
            commitment: { type: String, enum: ['Full time', 'Part time'], required: true },
            tasksAndDeliveries: { type: String },
            requiredExperience: { type: String },
            monthlyRate: { type: Number, required: true },
            jobType: { type: String, enum: ['On site', 'Remote'], required: true },
            city: { type: String },
            estimateLengthOfRole: { type: String, enum: ['1-2 weeks', '2-4 weeks', '1-3 months', '3-6 months', '6-12 months', '12+ months'], required: true },
            workdayOverlap: { type: Number, min: 1, max: 8 }
        }
    ]
});

module.exports = mongoose.model('Job', jobSchema);
