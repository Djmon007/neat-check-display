export interface ReportData {
  property: { name: string; unit: string; address: string };
  stay: { checkout: string; readyBy: string };
  generatedAt: string;
  preparedBy: { name: string; team: string };
  workOrderId: string;
  status: "ready" | "exceptions" | "not-ready";
  checklist: { completed: number; total: number };
  issueCount: { total: number; urgent: number; normal: number; fyi: number };
  photosUploaded: number;
  timeOnSite: string;
  suppliesRestocked: boolean;
  issues: Issue[];
  rooms: Room[];
  supplies: Supply[];
  signOff: SignOff;
}

export interface Issue {
  id: string;
  priority: "urgent" | "normal" | "fyi";
  category: string;
  location: string;
  linkedTask: string;
  description: string;
  photos: string[];
  suggestedAction: string;
  status: "new" | "acknowledged" | "resolved";
  recommendation: string;
}

export interface ChecklistItem {
  name: string;
  status: "complete" | "issue" | "incomplete";
  note?: string;
  photo?: string;
  completedAt?: string;
  markedBy?: string;
  issueId?: string;
}

export interface Room {
  name: string;
  icon: string;
  items: ChecklistItem[];
  beforePhoto: string;
  afterPhoto: string;
  photoTimestamp: string;
  photographer: string;
}

export interface Supply {
  item: string;
  quantity: number;
  status: "restocked" | "low" | "out";
}

export interface SignOff {
  completedBy: string;
  verifiedBy: string;
  confirmed: boolean;
  startTime: string;
  endTime: string;
}

// Placeholder photos using generated gradients
const placeholderPhoto = (seed: number, label: string) =>
  `https://images.unsplash.com/photo-${seed}?w=800&h=600&fit=crop&auto=format`;

// Using real Unsplash photos for the demo
const PHOTOS = {
  kitchenBefore: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
  kitchenAfter: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&h=600&fit=crop",
  livingBefore: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  livingAfter: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
  bath1Before: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
  bath1After: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
  bedroomBefore: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
  bedroomAfter: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
  crackedTile: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
  stain: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
  towels: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
};

export const mockReport: ReportData = {
  property: {
    name: "Sunset Cove Villa",
    unit: "Unit 304",
    address: "1842 Ocean Blvd, Santa Monica, CA 90401",
  },
  stay: {
    checkout: "Feb 25, 2026 · 11:00 AM",
    readyBy: "Feb 25, 2026 · 3:00 PM",
  },
  generatedAt: "Feb 25, 2026 · 3:12 PM",
  preparedBy: { name: "Maria Santos", team: "CleanStay Pro Services" },
  workOrderId: "WO-2026-0458",
  status: "exceptions",
  checklist: { completed: 47, total: 52 },
  issueCount: { total: 3, urgent: 1, normal: 2, fyi: 0 },
  photosUploaded: 18,
  timeOnSite: "2h 15m",
  suppliesRestocked: true,
  issues: [
    {
      id: "ISS-001",
      priority: "urgent",
      category: "Maintenance",
      location: "Bathroom 1",
      linkedTask: "Inspect tub surround",
      description: "Cracked tile near tub base, approximately 4×4 inches. Grout is deteriorating and moisture may be getting behind the tile.",
      photos: [PHOTOS.crackedTile],
      suggestedAction: "Maintenance visit needed",
      status: "new",
      recommendation: "Replace tile and re-grout surrounding area before next guest.",
    },
    {
      id: "ISS-002",
      priority: "normal",
      category: "Deep clean needed",
      location: "Living Room",
      linkedTask: "Inspect sofa & cushions",
      description: "Small stain on sofa armrest, approximately 2 inches. Attempted spot clean — partially removed.",
      photos: [PHOTOS.stain],
      suggestedAction: "Schedule professional upholstery cleaning",
      status: "new",
      recommendation: "Monitor after next clean; schedule deep clean if stain persists.",
    },
    {
      id: "ISS-003",
      priority: "normal",
      category: "Missing item",
      location: "Bathroom 1",
      linkedTask: "Replace towel set",
      description: "Bath towel set incomplete — only 2 of 4 bath towels available in linen closet. Hand towels OK.",
      photos: [PHOTOS.towels],
      suggestedAction: "Replace missing towels",
      status: "new",
      recommendation: "Restock 2 bath towels from inventory.",
    },
  ],
  rooms: [
    {
      name: "Kitchen",
      icon: "🍳",
      items: [
        { name: "Clean counters & backsplash", status: "complete", completedAt: "1:15 PM", markedBy: "Maria S." },
        { name: "Sanitize sink & faucet", status: "complete", completedAt: "1:18 PM", markedBy: "Maria S." },
        { name: "Clean & inspect appliances", status: "complete", completedAt: "1:25 PM", markedBy: "Maria S." },
        { name: "Check fridge interior", status: "issue", note: "Old leftovers removed, shelf wiped", completedAt: "1:28 PM", markedBy: "Maria S." },
        { name: "Restock coffee pods", status: "complete", completedAt: "1:30 PM", markedBy: "Maria S." },
        { name: "Wipe cabinet fronts", status: "complete", completedAt: "1:32 PM", markedBy: "Maria S." },
        { name: "Empty & clean trash bins", status: "complete", completedAt: "1:34 PM", markedBy: "Maria S." },
        { name: "Sweep & mop floor", status: "complete", completedAt: "1:40 PM", markedBy: "Maria S." },
        { name: "Check dishwasher", status: "complete", completedAt: "1:42 PM", markedBy: "Maria S." },
        { name: "Inspect under sink", status: "complete", completedAt: "1:44 PM", markedBy: "Maria S." },
        { name: "Replace dish sponge", status: "complete", completedAt: "1:45 PM", markedBy: "Maria S." },
        { name: "Check paper towels", status: "complete", completedAt: "1:46 PM", markedBy: "Maria S." },
      ],
      beforePhoto: PHOTOS.kitchenBefore,
      afterPhoto: PHOTOS.kitchenAfter,
      photoTimestamp: "Feb 25, 2026 · 1:46 PM",
      photographer: "Maria S.",
    },
    {
      name: "Living Room",
      icon: "🛋️",
      items: [
        { name: "Vacuum carpet & rugs", status: "complete", completedAt: "1:50 PM", markedBy: "Maria S." },
        { name: "Dust all surfaces", status: "complete", completedAt: "1:55 PM", markedBy: "Maria S." },
        { name: "Clean windows interior", status: "complete", completedAt: "2:00 PM", markedBy: "Maria S." },
        { name: "Inspect sofa & cushions", status: "issue", note: "Stain found on armrest", issueId: "ISS-002", completedAt: "2:05 PM", markedBy: "Maria S." },
        { name: "Arrange throw pillows", status: "complete", completedAt: "2:06 PM", markedBy: "Maria S." },
        { name: "Clean TV screen", status: "complete", completedAt: "2:08 PM", markedBy: "Maria S." },
        { name: "Check remotes & batteries", status: "complete", completedAt: "2:09 PM", markedBy: "Maria S." },
        { name: "Wipe light switches", status: "complete", completedAt: "2:10 PM", markedBy: "Maria S." },
      ],
      beforePhoto: PHOTOS.livingBefore,
      afterPhoto: PHOTOS.livingAfter,
      photoTimestamp: "Feb 25, 2026 · 2:10 PM",
      photographer: "Maria S.",
    },
    {
      name: "Bathroom 1",
      icon: "🚿",
      items: [
        { name: "Scrub shower & tub", status: "complete", completedAt: "2:15 PM", markedBy: "Maria S." },
        { name: "Clean toilet inside & out", status: "complete", completedAt: "2:18 PM", markedBy: "Maria S." },
        { name: "Sanitize sink & vanity", status: "complete", completedAt: "2:20 PM", markedBy: "Maria S." },
        { name: "Clean mirror", status: "complete", completedAt: "2:22 PM", markedBy: "Maria S." },
        { name: "Inspect tub surround", status: "issue", note: "Cracked tile found", issueId: "ISS-001", completedAt: "2:25 PM", markedBy: "Maria S." },
        { name: "Replace towel set", status: "incomplete", note: "Only 2 of 4 available", issueId: "ISS-003", completedAt: "2:27 PM", markedBy: "Maria S." },
        { name: "Restock toilet paper", status: "complete", completedAt: "2:28 PM", markedBy: "Maria S." },
        { name: "Restock soap & shampoo", status: "complete", completedAt: "2:29 PM", markedBy: "Maria S." },
        { name: "Mop floor", status: "complete", completedAt: "2:32 PM", markedBy: "Maria S." },
        { name: "Clean exhaust fan", status: "complete", completedAt: "2:34 PM", markedBy: "Maria S." },
        { name: "Check plumbing for leaks", status: "complete", completedAt: "2:35 PM", markedBy: "Maria S." },
      ],
      beforePhoto: PHOTOS.bath1Before,
      afterPhoto: PHOTOS.bath1After,
      photoTimestamp: "Feb 25, 2026 · 2:35 PM",
      photographer: "Maria S.",
    },
    {
      name: "Master Bedroom",
      icon: "🛏️",
      items: [
        { name: "Change bed linens", status: "complete", completedAt: "2:40 PM", markedBy: "Maria S." },
        { name: "Make bed to standard", status: "complete", completedAt: "2:45 PM", markedBy: "Maria S." },
        { name: "Vacuum floors", status: "complete", completedAt: "2:48 PM", markedBy: "Maria S." },
        { name: "Dust nightstands & dresser", status: "complete", completedAt: "2:50 PM", markedBy: "Maria S." },
        { name: "Clean windows", status: "complete", completedAt: "2:52 PM", markedBy: "Maria S." },
        { name: "Check closet & hangers", status: "complete", completedAt: "2:54 PM", markedBy: "Maria S." },
        { name: "Inspect mattress protector", status: "complete", completedAt: "2:55 PM", markedBy: "Maria S." },
        { name: "Wipe light switches & outlets", status: "complete", completedAt: "2:56 PM", markedBy: "Maria S." },
        { name: "Check alarm clock", status: "complete", completedAt: "2:57 PM", markedBy: "Maria S." },
        { name: "Place welcome materials", status: "complete", completedAt: "2:58 PM", markedBy: "Maria S." },
        { name: "Final room inspection", status: "complete", completedAt: "3:00 PM", markedBy: "Maria S." },
      ],
      beforePhoto: PHOTOS.bedroomBefore,
      afterPhoto: PHOTOS.bedroomAfter,
      photoTimestamp: "Feb 25, 2026 · 3:00 PM",
      photographer: "Maria S.",
    },
  ],
  supplies: [
    { item: "Paper towel rolls", quantity: 2, status: "restocked" },
    { item: "Toilet paper rolls", quantity: 4, status: "restocked" },
    { item: "Hand soap refills", quantity: 1, status: "restocked" },
    { item: "Coffee pods (variety)", quantity: 12, status: "restocked" },
    { item: "Dishwasher pods", quantity: 0, status: "low" },
    { item: "Bath towels", quantity: 0, status: "out" },
    { item: "Trash bags", quantity: 3, status: "restocked" },
    { item: "Shampoo bottles", quantity: 2, status: "restocked" },
  ],
  signOff: {
    completedBy: "Maria Santos",
    verifiedBy: "Carlos Rivera (Supervisor)",
    confirmed: true,
    startTime: "12:45 PM",
    endTime: "3:00 PM",
  },
};
