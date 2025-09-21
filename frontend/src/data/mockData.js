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
    frequency: "multiple_complaints",
    statusHistory: [
      { status: "pending", date: "2025-01-15T10:30:00Z", note: "Issue reported by citizen" }
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
    frequency: "urgent",
    statusHistory: [
      { status: "pending", date: "2025-01-14T14:20:00Z", note: "Issue reported" },
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
    frequency: "regular_issue",
    statusHistory: [
      { status: "pending", date: "2025-01-12T16:45:00Z", note: "Issue reported" },
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
    frequency: "seasonal_issue",
    statusHistory: [
      { status: "pending", date: "2025-01-10T11:15:00Z", note: "Issue reported" },
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
    frequency: "urgent",
    statusHistory: [
      { status: "pending", date: "2025-01-16T07:30:00Z", note: "Emergency reported" },
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
    frequency: "technical_failure",
    statusHistory: [
      { status: "pending", date: "2025-01-17T06:00:00Z", note: "Transformer failure reported" }
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
    frequency: "infrastructure_damage",
    statusHistory: [
      { status: "pending", date: "2025-01-15T12:00:00Z", note: "Infrastructure damage reported" }
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
    frequency: "maintenance_issue",
    statusHistory: [
      { status: "pending", date: "2025-01-13T14:30:00Z", note: "Sanitation facility issue reported" }
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
    frequency: "violation",
    statusHistory: [
      { status: "pending", date: "2025-01-11T09:45:00Z", note: "Encroachment reported" },
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
    frequency: "environmental_hazard",
    statusHistory: [
      { status: "pending", date: "2025-01-09T08:00:00Z", note: "Environmental violation reported" },
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
    frequency: "safety_hazard",
    statusHistory: [
      { status: "pending", date: "2025-01-16T15:20:00Z", note: "AI Auto-categorized: Public Park Equipment" }
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