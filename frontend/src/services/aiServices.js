// AI Services for Issue Deduplication and Verification
import { mockIssues } from '../data/mockData';

// Simulate AI text similarity calculation
const calculateSimilarity = (text1, text2) => {
  // Simple mock similarity algorithm - in real app, use ML/NLP models
  const words1 = text1.toLowerCase().split(' ');
  const words2 = text2.toLowerCase().split(' ');
  
  const intersection = words1.filter(word => words2.includes(word));
  const union = [...new Set([...words1, ...words2])];
  
  return Math.floor((intersection.length / union.length) * 100);
};

// AI Deduplication Service
export const aiDeduplicationService = {
  async checkForDuplicates(newIssue) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const duplicates = [];
    
    for (const existingIssue of mockIssues) {
      // Check title similarity
      const titleSimilarity = calculateSimilarity(newIssue.title, existingIssue.title);
      
      // Check description similarity
      const descriptionSimilarity = calculateSimilarity(newIssue.description, existingIssue.description);
      
      // Check location proximity (simplified - within 1km radius)
      const locationDistance = Math.sqrt(
        Math.pow(newIssue.location.lat - existingIssue.location.lat, 2) +
        Math.pow(newIssue.location.lng - existingIssue.location.lng, 2)
      ) * 111; // Rough km conversion
      
      const isNearby = locationDistance < 1; // Within 1km
      
      // Combined similarity score
      const overallSimilarity = (titleSimilarity + descriptionSimilarity) / 2;
      
      // Consider it a duplicate if similarity > 75% and nearby location
      if (overallSimilarity > 75 && isNearby && existingIssue.category === newIssue.category) {
        duplicates.push({
          issueId: existingIssue.id,
          similarity: overallSimilarity,
          reason: 'Similar issue found within 1km radius',
          existingIssue: existingIssue
        });
      }
    }
    
    return {
      isDuplicate: duplicates.length > 0,
      duplicates: duplicates,
      confidence: duplicates.length > 0 ? Math.max(...duplicates.map(d => d.similarity)) : 0
    };
  },

  async incrementFrequency(issueId, reporterInfo) {
    // In real app, this would update the database
    const issue = mockIssues.find(i => i.id === issueId);
    if (issue) {
      issue.frequency += 1;
      issue.reportCount += 1;
      issue.duplicateReports.push({
        reporterId: reporterInfo.id,
        date: new Date().toISOString(),
        similarity: 85 + Math.floor(Math.random() * 15)
      });
      
      // Update priority based on frequency
      if (issue.frequency > 20) {
        issue.priority = 'critical';
      } else if (issue.frequency > 10) {
        issue.priority = 'high';
      } else if (issue.frequency > 5) {
        issue.priority = 'medium';
      }
    }
    
    return issue;
  }
};

// AI Verification Service
export const aiVerificationService = {
  async verifyIssue(issue) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let score = 50; // Base score
    
    // Verification factors
    const factors = {
      locationValid: this.validateLocation(issue.location),
      descriptionQuality: this.assessDescriptionQuality(issue.description),
      reporterHistory: this.checkReporterHistory(issue.reporter),
      categoryMatch: this.verifyCategoryMatch(issue.title, issue.description, issue.category),
      timeConsistency: this.checkTimeConsistency(issue.dateReported),
      duplicateSupport: issue.frequency > 1
    };
    
    // Calculate weighted score
    if (factors.locationValid) score += 15;
    if (factors.descriptionQuality > 0.7) score += 20;
    if (factors.reporterHistory > 0.8) score += 10;
    if (factors.categoryMatch > 0.8) score += 15;
    if (factors.timeConsistency) score += 10;
    if (factors.duplicateSupport) score += 15;
    
    // Multiple reports boost credibility
    if (issue.frequency > 5) score += 10;
    if (issue.frequency > 10) score += 10;
    
    score = Math.min(100, score);
    
    let status = 'pending_verification';
    if (score >= 85) status = 'verified';
    else if (score >= 70) status = 'pending_verification';
    else if (score >= 50) status = 'ai_verifying';
    else status = 'flagged_suspicious';
    
    return {
      verificationScore: score,
      status: status,
      factors: factors,
      recommendation: this.getRecommendation(score, factors)
    };
  },

  validateLocation(location) {
    // Check if coordinates are within Jharkhand bounds (simplified)
    const jharkhandBounds = {
      north: 24.8, south: 22.0,
      east: 87.0, west: 83.5
    };
    
    return (
      location.lat >= jharkhandBounds.south &&
      location.lat <= jharkhandBounds.north &&
      location.lng >= jharkhandBounds.west &&
      location.lng <= jharkhandBounds.east
    );
  },

  assessDescriptionQuality(description) {
    // Simple quality assessment
    const wordCount = description.split(' ').length;
    const hasDetails = /\d+|specific|exact|located|near|area|road|street/.test(description.toLowerCase());
    
    let quality = 0.3;
    if (wordCount > 10) quality += 0.2;
    if (wordCount > 20) quality += 0.2;
    if (hasDetails) quality += 0.3;
    
    return Math.min(1, quality);
  },

  checkReporterHistory(reporter) {
    // Mock reporter credibility - in real app, check database
    const credibilityScores = {
      'RAN001': 0.9, 'RAN002': 0.95, 'RAN003': 0.8, 'RAN004': 0.9,
      'RAN005': 0.95, 'RAN006': 0.85, 'RAN007': 0.6, 'RAN008': 0.8,
      'RAN009': 0.9, 'RAN010': 0.95, 'RAN011': 0.4
    };
    
    return credibilityScores[reporter.id] || 0.7;
  },

  verifyCategoryMatch(title, description, category) {
    const categoryKeywords = {
      streetlight: ['light', 'lamp', 'bulb', 'illumination', 'dark', 'night'],
      pothole: ['pothole', 'road', 'crack', 'damage', 'vehicle', 'traffic'],
      garbage: ['garbage', 'waste', 'trash', 'bin', 'dirty', 'smell'],
      waterlogging: ['water', 'flood', 'drain', 'blocked', 'overflow'],
      water_supply: ['water', 'supply', 'tap', 'pipe', 'shortage'],
      electricity: ['power', 'electricity', 'transformer', 'outage'],
      transport: ['bus', 'transport', 'stop', 'shelter', 'public'],
      sanitation: ['toilet', 'sanitation', 'hygiene', 'bathroom'],
      encroachment: ['illegal', 'construction', 'encroach', 'block'],
      pollution: ['pollution', 'smoke', 'noise', 'air', 'toxic']
    };
    
    const keywords = categoryKeywords[category] || [];
    const text = (title + ' ' + description).toLowerCase();
    
    const matches = keywords.filter(keyword => text.includes(keyword)).length;
    return matches / keywords.length;
  },

  checkTimeConsistency(dateReported) {
    const reportTime = new Date(dateReported);
    const now = new Date();
    const hoursDiff = (now - reportTime) / (1000 * 60 * 60);
    
    // Issues reported within last 30 days are considered timely
    return hoursDiff <= 720; // 30 days
  },

  getRecommendation(score, factors) {
    if (score >= 85) {
      return 'Issue verified with high confidence. Display on public dashboard.';
    } else if (score >= 70) {
      return 'Issue likely valid. Monitor for additional reports for confirmation.';
    } else if (score >= 50) {
      return 'Issue requires additional verification. Check with local authorities.';
    } else {
      return 'Issue flagged as suspicious. Requires manual review before displaying.';
    }
  }
};

// Cross-verification with multiple users
export const crossVerificationService = {
  async analyzeReportConsistency(issue) {
    if (issue.duplicateReports.length < 2) {
      return {
        consistency: 'insufficient_data',
        score: 30,
        message: 'Need more reports for cross-verification'
      };
    }
    
    // Analyze duplicate reports for consistency
    const reports = issue.duplicateReports;
    const avgSimilarity = reports.reduce((sum, report) => sum + report.similarity, 0) / reports.length;
    
    // Time distribution analysis
    const timeSpread = this.analyzeTimeDistribution(reports);
    
    // Reporter diversity
    const uniqueReporters = new Set(reports.map(r => r.reporterId)).size;
    const reporterDiversity = uniqueReporters / reports.length;
    
    let consistencyScore = 0;
    
    // High similarity between reports
    if (avgSimilarity > 85) consistencyScore += 30;
    else if (avgSimilarity > 70) consistencyScore += 20;
    
    // Good time distribution (not all at once)
    if (timeSpread > 0.5) consistencyScore += 25;
    
    // Reporter diversity
    if (reporterDiversity > 0.7) consistencyScore += 25;
    
    // Frequency bonus
    if (reports.length > 10) consistencyScore += 20;
    else if (reports.length > 5) consistencyScore += 10;
    
    let consistency = 'low';
    if (consistencyScore >= 80) consistency = 'high';
    else if (consistencyScore >= 60) consistency = 'medium';
    
    return {
      consistency,
      score: consistencyScore,
      avgSimilarity,
      reporterDiversity,
      timeSpread,
      message: this.getConsistencyMessage(consistency, consistencyScore)
    };
  },

  analyzeTimeDistribution(reports) {
    if (reports.length < 2) return 0;
    
    const times = reports.map(r => new Date(r.date).getTime()).sort();
    const timeGaps = [];
    
    for (let i = 1; i < times.length; i++) {
      timeGaps.push(times[i] - times[i-1]);
    }
    
    const avgGap = timeGaps.reduce((sum, gap) => sum + gap, 0) / timeGaps.length;
    const variance = timeGaps.reduce((sum, gap) => sum + Math.pow(gap - avgGap, 2), 0) / timeGaps.length;
    
    // Normalize variance (0-1 scale)
    return Math.min(1, variance / (1000 * 60 * 60 * 24 * 7)); // Week variance
  },

  getConsistencyMessage(consistency, score) {
    switch(consistency) {
      case 'high':
        return 'Multiple independent reports confirm this issue with high consistency.';
      case 'medium':
        return 'Reports show reasonable consistency. Issue likely valid.';
      case 'low':
        return 'Reports show low consistency. May indicate coordinated false reporting.';
      default:
        return 'Insufficient data for cross-verification analysis.';
    }
  }
};