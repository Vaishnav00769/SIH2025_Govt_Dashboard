// Mock data for Jharkhand Civic Issue Management Dashboard

export const mockIssues = [
  {
    id: 1,
    title: "Street Light Not Working on Main Road",
    description: "Multiple street lights are not functioning on Main Road near Bus Stand, causing safety concerns for pedestrians at night.",
    category: "streetlight",
    status: "pending",
    priority: "high",
    escalationLevel: "local",
    dateReported: "2025-01-15T10:30:00Z",
    location: {
      address: "Main Road, Bus Stand, Ranchi",
      lat: 23.3441,
      lng: 85.3096
    },
    reporter: {
      name: "Rajesh Kumar",
      id: "RAN001"
    },
    frequency: 8,
    reportCount: 8,
    aiVerificationStatus: "verified",
    verificationScore: 95,
    isDuplicate: false,
    duplicateReports: [
      { reporterId: "RAN001", date: "2025-01-15T10:30:00Z", similarity: 100 },
      { reporterId: "RAN012", date: "2025-01-16T08:15:00Z", similarity: 87 },
      { reporterId: "RAN013", date: "2025-01-16T19:45:00Z", similarity: 92 },
      { reporterId: "RAN014", date: "2025-01-17T07:20:00Z", similarity: 89 },
      { reporterId: "RAN015", date: "2025-01-17T18:30:00Z", similarity: 95 },
      { reporterId: "RAN016", date: "2025-01-18T06:45:00Z", similarity: 88 },
      { reporterId: "RAN017", date: "2025-01-18T20:10:00Z", similarity: 91 },
      { reporterId: "RAN018", date: "2025-01-19T09:25:00Z", similarity: 93 }
    ],
    statusHistory: [
      { status: "pending", date: "2025-01-15T10:30:00Z", note: "Issue reported by citizen" },
      { status: "ai_verified", date: "2025-01-15T10:35:00Z", note: "AI verified with 95% confidence" }
    ]
  },
  {
    id: 2,
    title: "Large Pothole on National Highway",
    description: "Deep pothole causing damage to vehicles and traffic congestion on NH-33.",
    category: "pothole",
    status: "in_progress",
    priority: "high",
    escalationLevel: "district",
    dateReported: "2025-01-14T14:20:00Z",
    location: {
      address: "NH-33, Bariatu, Ranchi",
      lat: 23.3629,
      lng: 85.3321
    },
    reporter: {
      name: "Sunita Devi",
      id: "RAN002"
    },
    frequency: 12,
    reportCount: 12,
    aiVerificationStatus: "verified",
    verificationScore: 98,
    isDuplicate: false,
    duplicateReports: [
      { reporterId: "RAN002", date: "2025-01-14T14:20:00Z", similarity: 100 },
      { reporterId: "RAN019", date: "2025-01-14T16:30:00Z", similarity: 94 },
      { reporterId: "RAN020", date: "2025-01-15T08:45:00Z", similarity: 96 },
      { reporterId: "RAN021", date: "2025-01-15T12:15:00Z", similarity: 91 },
      { reporterId: "RAN022", date: "2025-01-16T07:30:00Z", similarity: 89 },
      { reporterId: "RAN023", date: "2025-01-16T14:20:00Z", similarity: 93 },
      { reporterId: "RAN024", date: "2025-01-17T09:10:00Z", similarity: 97 },
      { reporterId: "RAN025", date: "2025-01-17T15:45:00Z", similarity: 92 },
      { reporterId: "RAN026", date: "2025-01-18T11:30:00Z", similarity: 95 },
      { reporterId: "RAN027", date: "2025-01-18T17:20:00Z", similarity: 88 },
      { reporterId: "RAN028", date: "2025-01-19T08:15:00Z", similarity: 94 },
      { reporterId: "RAN029", date: "2025-01-19T13:50:00Z", similarity: 90 }
    ],
    statusHistory: [
      { status: "pending", date: "2025-01-14T14:20:00Z", note: "Issue reported" },
      { status: "ai_verified", date: "2025-01-14T14:25:00Z", note: "AI verified with 98% confidence" },
      { status: "in_progress", date: "2025-01-16T09:00:00Z", note: "Work crew assigned" }
    ]
  },
  {
    id: 3,
    title: "Garbage Overflowing Near Market",
    description: "Commercial waste bins overflowing for past 3 days, creating unhygienic conditions.",
    category: "garbage",
    status: "resolved",
    priority: "medium",
    escalationLevel: "local",
    dateReported: "2025-01-12T16:45:00Z",
    location: {
      address: "Upper Bazaar Market, Ranchi",
      lat: 23.3525,
      lng: 85.3271
    },
    reporter: {
      name: "Amit Singh",
      id: "RAN003"
    },
    frequency: 3,
    reportCount: 3,
    aiVerificationStatus: "verified",
    verificationScore: 78,
    isDuplicate: false,
    duplicateReports: [
      { reporterId: "RAN003", date: "2025-01-12T16:45:00Z", similarity: 100 },
      { reporterId: "RAN030", date: "2025-01-12T18:20:00Z", similarity: 85 },
      { reporterId: "RAN031", date: "2025-01-13T09:15:00Z", similarity: 83 }
    ],
    statusHistory: [
      { status: "pending", date: "2025-01-12T16:45:00Z", note: "Issue reported" },
      { status: "ai_verified", date: "2025-01-12T16:50:00Z", note: "AI verified with 78% confidence" },
      { status: "in_progress", date: "2025-01-13T08:00:00Z", note: "Cleaning crew dispatched" },
      { status: "resolved", date: "2025-01-13T15:30:00Z", note: "Area cleaned and bins emptied" }
    ]
  },
  {
    id: 4,
    title: "Waterlogging in Residential Area",
    description: "Severe waterlogging during monsoon due to blocked drainage system affecting 50+ houses.",
    category: "waterlogging",
    status: "escalated",
    priority: "high",
    escalationLevel: "state",
    dateReported: "2025-01-10T11:15:00Z",
    location: {
      address: "Kanke Road, Residential Colony, Ranchi",
      lat: 23.4241,
      lng: 85.4381
    },
    reporter: {
      name: "Priya Kumari",
      id: "RAN004"
    },
    frequency: 15,
    reportCount: 15,
    aiVerificationStatus: "verified",
    verificationScore: 99,
    isDuplicate: false,
    duplicateReports: [
      { reporterId: "RAN004", date: "2025-01-10T11:15:00Z", similarity: 100 },
      { reporterId: "RAN032", date: "2025-01-10T13:30:00Z", similarity: 96 },
      { reporterId: "RAN033", date: "2025-01-10T15:45:00Z", similarity: 94 },
      { reporterId: "RAN034", date: "2025-01-11T08:20:00Z", similarity: 92 },
      { reporterId: "RAN035", date: "2025-01-11T12:10:00Z", similarity: 98 },
      { reporterId: "RAN036", date: "2025-01-11T16:35:00Z", similarity: 91 },
      { reporterId: "RAN037", date: "2025-01-12T07:15:00Z", similarity: 89 },
      { reporterId: "RAN038", date: "2025-01-12T14:40:00Z", similarity: 95 },
      { reporterId: "RAN039", date: "2025-01-13T09:25:00Z", similarity: 93 },
      { reporterId: "RAN040", date: "2025-01-13T17:50:00Z", similarity: 87 },
      { reporterId: "RAN041", date: "2025-01-14T11:30:00Z", similarity: 96 },
      { reporterId: "RAN042", date: "2025-01-15T08:45:00Z", similarity: 94 },
      { reporterId: "RAN043", date: "2025-01-16T13:20:00Z", similarity: 90 },
      { reporterId: "RAN044", date: "2025-01-17T10:55:00Z", similarity: 88 },
      { reporterId: "RAN045", date: "2025-01-18T15:10:00Z", similarity: 92 }
    ],
    statusHistory: [
      { status: "pending", date: "2025-01-10T11:15:00Z", note: "Issue reported" },
      { status: "ai_verified", date: "2025-01-10T11:20:00Z", note: "AI verified with 99% confidence" },
      { status: "escalated", date: "2025-01-17T10:00:00Z", note: "Escalated to state level for major drainage work" }
    ]
  },
  {
    id: 5,
    title: "No Water Supply for 2 Days",
    description: "Complete water supply cut-off in residential area, affecting 200+ families.",
    category: "water_supply",
    status: "in_progress",
    priority: "critical",
    escalationLevel: "district",
    dateReported: "2025-01-16T07:30:00Z",
    location: {
      address: "Lalpur Colony, Ranchi",
      lat: 23.3765,
      lng: 85.3322
    },
    reporter: {
      name: "Manoj Yadav",
      id: "RAN005"
    },
    frequency: 22,
    reportCount: 22,
    aiVerificationStatus: "verified",
    verificationScore: 97,
    isDuplicate: false,
    duplicateReports: Array.from({length: 22}, (_, i) => ({
      reporterId: `RAN${String(46 + i).padStart(3, '0')}`,
      date: new Date(Date.now() - (21-i) * 2 * 60 * 60 * 1000).toISOString(),
      similarity: 85 + Math.floor(Math.random() * 15)
    })),
    statusHistory: [
      { status: "pending", date: "2025-01-16T07:30:00Z", note: "Emergency reported" },
      { status: "ai_verified", date: "2025-01-16T07:32:00Z", note: "AI verified with 97% confidence" },
      { status: "in_progress", date: "2025-01-16T09:00:00Z", note: "Water board team investigating" }
    ]
  },
  {
    id: 6,
    title: "Power Outage - Transformer Fault",
    description: "Transformer burnt causing power cut to entire locality for 12+ hours.",
    category: "electricity",
    status: "pending",
    priority: "high",
    escalationLevel: "local",
    dateReported: "2025-01-17T06:00:00Z",
    location: {
      address: "Hindpiri, Ranchi",
      lat: 23.3733,
      lng: 85.3176
    },
    reporter: {
      name: "Deepak Pandey",
      id: "RAN006"
    },
    frequency: 6,
    reportCount: 6,
    aiVerificationStatus: "verified",
    verificationScore: 91,
    isDuplicate: false,
    duplicateReports: [
      { reporterId: "RAN006", date: "2025-01-17T06:00:00Z", similarity: 100 },
      { reporterId: "RAN068", date: "2025-01-17T06:15:00Z", similarity: 94 },
      { reporterId: "RAN069", date: "2025-01-17T06:45:00Z", similarity: 87 },
      { reporterId: "RAN070", date: "2025-01-17T07:20:00Z", similarity: 92 },
      { reporterId: "RAN071", date: "2025-01-17T08:10:00Z", similarity: 89 },
      { reporterId: "RAN072", date: "2025-01-17T09:30:00Z", similarity: 86 }
    ],
    statusHistory: [
      { status: "pending", date: "2025-01-17T06:00:00Z", note: "Transformer failure reported" },
      { status: "ai_verified", date: "2025-01-17T06:05:00Z", note: "AI verified with 91% confidence" }
    ]
  },
  {
    id: 7,
    title: "Bus Stop Shelter Damaged",
    description: "Bus stop roof collapsed, no seating arrangement for commuters.",
    category: "transport",
    status: "pending",
    priority: "medium",
    escalationLevel: "local",
    dateReported: "2025-01-15T12:00:00Z",
    location: {
      address: "Circular Road Bus Stop, Ranchi",
      lat: 23.3569,
      lng: 85.3239
    },
    reporter: {
      name: "Sita Ram",
      id: "RAN007"
    },
    frequency: 2,
    reportCount: 2,
    aiVerificationStatus: "pending_verification",
    verificationScore: 65,
    isDuplicate: false,
    duplicateReports: [
      { reporterId: "RAN007", date: "2025-01-15T12:00:00Z", similarity: 100 },
      { reporterId: "RAN073", date: "2025-01-16T14:30:00Z", similarity: 81 }
    ],
    statusHistory: [
      { status: "pending", date: "2025-01-15T12:00:00Z", note: "Infrastructure damage reported" },
      { status: "ai_verifying", date: "2025-01-15T12:05:00Z", note: "AI verification in progress" }
    ]
  },
  {
    id: 8,
    title: "Public Toilet Not Functional",
    description: "Community toilet locked for weeks, no maintenance, causing sanitation issues.",
    category: "sanitation",
    status: "pending",
    priority: "medium",
    escalationLevel: "local",
    dateReported: "2025-01-13T14:30:00Z",
    location: {
      address: "Railway Station Area, Ranchi",
      lat: 23.3441,
      lng: 85.3096
    },
    reporter: {
      name: "Kavita Devi",
      id: "RAN008"
    },
    frequency: 4,
    reportCount: 4,
    aiVerificationStatus: "verified",
    verificationScore: 82,
    isDuplicate: false,
    duplicateReports: [
      { reporterId: "RAN008", date: "2025-01-13T14:30:00Z", similarity: 100 },
      { reporterId: "RAN074", date: "2025-01-14T09:15:00Z", similarity: 88 },
      { reporterId: "RAN075", date: "2025-01-15T16:45:00Z", similarity: 85 },
      { reporterId: "RAN076", date: "2025-01-17T11:20:00Z", similarity: 83 }
    ],
    statusHistory: [
      { status: "pending", date: "2025-01-13T14:30:00Z", note: "Sanitation facility issue reported" },
      { status: "ai_verified", date: "2025-01-13T14:35:00Z", note: "AI verified with 82% confidence" }
    ]
  },
  {
    id: 9,
    title: "Illegal Construction Blocking Road",
    description: "Unauthorized construction encroaching public road, reducing traffic width by 50%.",
    category: "encroachment",
    status: "escalated",
    priority: "high",
    escalationLevel: "district",
    dateReported: "2025-01-11T09:45:00Z",
    location: {
      address: "Kadru Main Road, Ranchi",
      lat: 23.3067,
      lng: 85.2804
    },
    reporter: {
      name: "Ravi Shankar",
      id: "RAN009"
    },
    frequency: 7,
    reportCount: 7,
    aiVerificationStatus: "verified",
    verificationScore: 94,
    isDuplicate: false,
    duplicateReports: [
      { reporterId: "RAN009", date: "2025-01-11T09:45:00Z", similarity: 100 },
      { reporterId: "RAN077", date: "2025-01-12T08:30:00Z", similarity: 91 },
      { reporterId: "RAN078", date: "2025-01-13T15:20:00Z", similarity: 89 },
      { reporterId: "RAN079", date: "2025-01-14T11:45:00Z", similarity: 87 },
      { reporterId: "RAN080", date: "2025-01-15T16:10:00Z", similarity: 93 },
      { reporterId: "RAN081", date: "2025-01-16T10:25:00Z", similarity: 90 },
      { reporterId: "RAN082", date: "2025-01-17T14:40:00Z", similarity: 88 }
    ],
    statusHistory: [
      { status: "pending", date: "2025-01-11T09:45:00Z", note: "Encroachment reported" },
      { status: "ai_verified", date: "2025-01-11T09:50:00Z", note: "AI verified with 94% confidence" },
      { status: "escalated", date: "2025-01-16T11:00:00Z", note: "Escalated to district collector for action" }
    ]
  },
  {
    id: 10,
    title: "Heavy Air Pollution from Factory",
    description: "Textile factory releasing toxic fumes, affecting nearby residential area.",
    category: "pollution",
    status: "in_progress",
    priority: "critical",
    escalationLevel: "state",
    dateReported: "2025-01-09T08:00:00Z",
    location: {
      address: "Industrial Area, Ranchi",
      lat: 23.3217,
      lng: 85.3029
    },
    reporter: {
      name: "Dr. Anita Sharma",
      id: "RAN010"
    },
    frequency: 18,
    reportCount: 18,
    aiVerificationStatus: "verified",
    verificationScore: 96,
    isDuplicate: false,
    duplicateReports: Array.from({length: 18}, (_, i) => ({
      reporterId: `RAN${String(83 + i).padStart(3, '0')}`,
      date: new Date(Date.now() - (17-i) * 6 * 60 * 60 * 1000).toISOString(),
      similarity: 80 + Math.floor(Math.random() * 20)
    })),
    statusHistory: [
      { status: "pending", date: "2025-01-09T08:00:00Z", note: "Environmental violation reported" },
      { status: "ai_verified", date: "2025-01-09T08:05:00Z", note: "AI verified with 96% confidence" },
      { status: "in_progress", date: "2025-01-14T10:00:00Z", note: "Pollution control board investigating" }
    ]
  },
  {
    id: 11,
    title: "Broken Playground Equipment",
    description: "Children's swing set damaged, safety hazard for kids in community park.",
    category: "ai_miscellaneous",
    status: "pending",
    priority: "medium",
    escalationLevel: "local",
    dateReported: "2025-01-16T15:20:00Z",
    location: {
      address: "Community Park, Doranda, Ranchi",
      lat: 23.3441,
      lng: 85.3096
    },
    reporter: {
      name: "Rekha Singh",
      id: "RAN011"
    },
    frequency: 1,
    reportCount: 1,
    aiVerificationStatus: "flagged_suspicious",
    verificationScore: 45,
    isDuplicate: false,
    duplicateReports: [
      { reporterId: "RAN011", date: "2025-01-16T15:20:00Z", similarity: 100 }
    ],
    statusHistory: [
      { status: "pending", date: "2025-01-16T15:20:00Z", note: "AI Auto-categorized: Public Park Equipment" },
      { status: "ai_flagged", date: "2025-01-16T15:25:00Z", note: "AI flagged for manual verification - low confidence score" }
    ]
  }
];

export const categoryConfig = {
  streetlight: {
    name: "Streetlight Damage",
    color: "#ef4444", // red
    icon: "Lightbulb"
  },
  pothole: {
    name: "Potholes / Road Damage", 
    color: "#f97316", // orange
    icon: "Construction"
  },
  garbage: {
    name: "Garbage Overflow",
    color: "#22c55e", // green
    icon: "Trash2"
  },
  waterlogging: {
    name: "Waterlogging / Drainage Issues",
    color: "#3b82f6", // blue
    icon: "Droplets"
  },
  water_supply: {
    name: "Drinking Water Supply Issues",
    color: "#8b5cf6", // purple
    icon: "Waves"
  },
  electricity: {
    name: "Electricity Outages / Transformer Issues",
    color: "#eab308", // yellow
    icon: "Zap"
  },
  transport: {
    name: "Public Transport Issues",
    color: "#a16207", // brown
    icon: "Bus"
  },
  sanitation: {
    name: "Public Toilet / Sanitation Issues",
    color: "#6b7280", // white/grey
    icon: "Home"
  },
  encroachment: {
    name: "Encroachment / Illegal Constructions",
    color: "#1f2937", // black
    icon: "Building"
  },
  pollution: {
    name: "Air / Noise Pollution",
    color: "#374151", // dark grey
    icon: "CloudDrizzle"
  },
  ai_miscellaneous: {
    name: "AI-Miscellaneous",
    color: "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24)", // rainbow gradient
    icon: "Bot"
  }
};

export const statusConfig = {
  pending: { name: "Pending", color: "#ef4444" },
  in_progress: { name: "In Progress", color: "#eab308" },
  resolved: { name: "Resolved", color: "#22c55e" },
  escalated: { name: "Escalated", color: "#8b5cf6" }
};

export const priorityConfig = {
  low: { name: "Low", color: "#22c55e" },
  medium: { name: "Medium", color: "#eab308" },
  high: { name: "High", color: "#f97316" },
  critical: { name: "Critical", color: "#ef4444" }
};

export const escalationLevels = {
  local: { name: "Local", color: "#22c55e" },
  district: { name: "District", color: "#eab308" },
  state: { name: "State", color: "#f97316" },
  central: { name: "Central", color: "#ef4444" }
};