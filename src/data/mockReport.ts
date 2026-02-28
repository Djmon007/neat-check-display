export interface ReportData {
  property: { name: string; unit: string; address: string };
  stay: { checkout: string; readyBy: string };
  generatedAt: string;
  preparedBy: { name: string; role: string; team: string };
  workOrderId: string;
  status: "ready" | "exceptions" | "not-ready";
  checklist: { completed: number; total: number };
  issueCount: { total: number; urgent: number; normal: number; fyi: number };
  photosUploaded: number;
  beforeAfterPairs: number;
  timeOnSite: string;
  suppliesRestocked: boolean;
  issues: Issue[];
  rooms: Room[];
  supplies: Supply[];
  signOff: SignOff;
  auditLog: AuditEntry[];
}

export interface Issue {
  id: string;
  priority: "urgent" | "normal" | "fyi";
  category: string;
  location: string;
  linkedTask: string;
  description: string;
  photos: string[];
  tags: string[];
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
  photos: RoomPhoto[];
}

export interface RoomPhoto {
  src: string;
  thumbnail: string;
  fullRes: string;
  caption: string;
  timestamp: string;
  photographer: string;
}

export interface Supply {
  item: string;
  location: string;
  quantity: number;
  status: "restocked" | "low" | "out";
}

export interface SignOff {
  completedBy: string;
  role: string;
  verifiedBy: string;
  confirmed: boolean;
  signedAt: string;
  startTime: string;
  endTime: string;
}

export interface AuditEntry {
  time: string;
  event: string;
}

const PHOTOS = {
  kitchenAfter: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&h=600&fit=crop",
  livingAfter: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
  bath1After: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
  bedroomAfter: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
  crackedTile: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
  stain: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
  towels: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
  kitchenCounter: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
  bathMirror: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
  bedroomBed: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
  livingCouch: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
};

const makePhoto = (src: string, caption: string, timestamp: string, photographer = "Maria S."): RoomPhoto => ({
  src,
  thumbnail: src,
  fullRes: src.replace("w=800", "w=2400").replace("h=600", "h=1800"),
  caption,
  timestamp,
  photographer,
});

export const mockReport: ReportData = {
  property: {
    name: "Villa Sunrise",
    unit: "#204 — Oceanview Suite",
    address: "1204 Coral Way, Miami Beach, FL",
  },
  stay: {
    checkout: "Jun 14, 2025 · 10:00 AM",
    readyBy: "Jun 14, 2025 · 2:00 PM",
  },
  generatedAt: "Jun 14, 2025 · 11:42 AM",
  preparedBy: { name: "Maria Santos", role: "Senior Housekeeper", team: "CleanCo Property Services" },
  workOrderId: "WO-2024-08471",
  status: "exceptions",
  checklist: { completed: 49, total: 52 },
  issueCount: { total: 3, urgent: 1, normal: 2, fyi: 0 },
  photosUploaded: 22,
  beforeAfterPairs: 8,
  timeOnSite: "2h 18m",
  suppliesRestocked: true,
  issues: [
    {
      id: "ISS-001",
      priority: "urgent",
      category: "Maintenance",
      location: "Bathroom 1",
      linkedTask: "Cracked tile near tub",
      description: "A hairline crack runs ~4 inches along the second tile from the tub edge. Potential for water ingress. Recommend maintenance visit before next check-in.",
      photos: [PHOTOS.crackedTile],
      tags: ["MAINTENANCE", "BATHROOM 1", "TILE/GROUT"],
      suggestedAction: "Schedule tile repair immediately",
      status: "new",
      recommendation: "Replace tile and re-grout surrounding area before next guest.",
    },
    {
      id: "ISS-002",
      priority: "normal",
      category: "Deep clean needed",
      location: "Living Room",
      linkedTask: "Sofa stain on armrest",
      description: "Small stain on sofa armrest, approximately 2 inches. Attempted spot clean — partially removed.",
      photos: [PHOTOS.stain],
      tags: ["UPHOLSTERY", "LIVING ROOM"],
      suggestedAction: "Schedule professional upholstery cleaning",
      status: "new",
      recommendation: "Monitor after next clean; schedule deep clean if stain persists.",
    },
    {
      id: "ISS-003",
      priority: "normal",
      category: "Missing item",
      location: "Bathroom 1",
      linkedTask: "Bath towel set incomplete",
      description: "Bath towel set incomplete — only 2 of 4 bath towels available in linen closet. Hand towels OK.",
      photos: [PHOTOS.towels],
      tags: ["LINENS", "BATHROOM 1"],
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
      photos: [
        makePhoto(PHOTOS.kitchenAfter, "Kitchen counters cleaned", "Jun 14, 2025 · 1:46 PM"),
        makePhoto(PHOTOS.kitchenCounter, "Kitchen sink area", "Jun 14, 2025 · 1:46 PM"),
      ],
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
      photos: [
        makePhoto(PHOTOS.livingAfter, "Living room complete", "Jun 14, 2025 · 2:10 PM"),
        makePhoto(PHOTOS.livingCouch, "Sofa area", "Jun 14, 2025 · 2:10 PM"),
      ],
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
      photos: [
        makePhoto(PHOTOS.bath1After, "Bathroom cleaned", "Jun 14, 2025 · 2:35 PM"),
        makePhoto(PHOTOS.bathMirror, "Mirror and vanity", "Jun 14, 2025 · 2:35 PM"),
      ],
    },
    {
      name: "Master Bedroom",
      icon: "🛏️",
      items: [
        { name: "Strip and remake bed with fresh linens", status: "complete", completedAt: "11:10 AM", markedBy: "Maria S." },
        { name: "Dust all surfaces and furniture", status: "complete", completedAt: "11:14 AM", markedBy: "Maria S." },
        { name: "Vacuum carpet / mop hardwood", status: "complete", completedAt: "11:18 AM", markedBy: "Maria S." },
        { name: "Wipe mirrors and glass surfaces", status: "complete", completedAt: "11:19 AM", markedBy: "Maria S." },
        { name: "Empty trash", status: "complete", completedAt: "11:20 AM", markedBy: "Maria S." },
        { name: "Stage decorative pillows", status: "complete", completedAt: "11:21 AM", markedBy: "Maria S." },
        { name: "Check closet / hangers", status: "complete", completedAt: "11:22 AM", markedBy: "Maria S." },
        { name: "Wipe light switches and outlets", status: "complete", completedAt: "11:23 AM", markedBy: "Maria S." },
        { name: "Check under bed", status: "complete", completedAt: "11:24 AM", markedBy: "Maria S." },
      ],
      photos: [
        makePhoto(PHOTOS.bedroomAfter, "Bedroom complete", "Jun 14, 2025 · 11:24 AM"),
        makePhoto(PHOTOS.bedroomBed, "Bed made to standard", "Jun 14, 2025 · 11:24 AM"),
      ],
    },
  ],
  supplies: [
    { item: "Toilet Paper", location: "Bathroom 1 + 2", quantity: 4, status: "restocked" },
    { item: "Paper Towels", location: "Kitchen", quantity: 2, status: "restocked" },
    { item: "Hand Soap", location: "All baths", quantity: 1, status: "restocked" },
    { item: "Bath Mat", location: "Master Bath", quantity: 1, status: "restocked" },
    { item: "Coffee Pods", location: "Kitchen", quantity: 6, status: "restocked" },
    { item: "Dishwasher Pods", location: "Kitchen", quantity: 0, status: "low" },
  ],
  signOff: {
    completedBy: "Maria Santos",
    role: "Senior Housekeeper · CleanCo",
    verifiedBy: "Carlos Rivera (Supervisor)",
    confirmed: true,
    signedAt: "Jun 14, 2025 · 11:40 AM",
    startTime: "8:30 AM",
    endTime: "11:40 AM",
  },
  auditLog: [
    { time: "8:30 AM", event: "Arrived on site. Work order opened." },
    { time: "8:52 AM", event: "Issue #1 logged — cracked tile (urgent)." },
    { time: "10:38 AM", event: "Issue #2 logged — sofa stain." },
    { time: "10:18 AM", event: "Issue #3 logged — pods low stock." },
    { time: "11:40 AM", event: "Report finalized. Digital signature applied." },
    { time: "11:42 AM", event: "Report link generated." },
  ],
};
