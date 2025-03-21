export const SelectTravelList = [
    {
        id: 1,
        title: 'Just Me',
        desc: "A sole traveler in Exploration",
        icon: "🙎",
        people: '1',
    },
    {
        id: 2,
        title: 'A Couple',
        desc: "Two Travelers in tandem",
        icon: "👩‍❤️‍💋‍👨",
        people: '2 people',
    },
    {
        id: 3,
        title: 'Family',
        desc: "A group of Fun loving Adventurers",
        icon: "👨‍👩‍👧‍👦",
        people: '3 to 5',
    },
    {
        id: 4,
        title: 'Friends',
        desc: "A bunch of thrill-seekers",
        icon: "🫂",
        people: '5 to 10',
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: "Stay conscious of costs",
        icon: "💵",
    },
    {
        id: 2,
        title: 'Moderate',
        desc: "Keep it Average",
        icon: "💰",
    },
    {
        id: 3,
        title: 'Luxury',
        desc: "No Worries about Money",
        icon: "💸",
    },
];

export const SelectFoodOptions = [
    {
        id: 1,
        title: 'Fast Food',
        desc: "Famous Fast Food Resturants",
        icon: "🍔",
    },
    {
        id: 2,
        title: 'Traditional Food',
        desc: "Keep it Average",
        icon: "🥩",
    },
];

export const SelectInterestOptions = [
    {
        id: 1,
        title: 'Spa',
        icon: "💆‍♀️",
    },
    {
        id: 2,
        title: 'Nightlife',
        icon: "🌃",
    },
    {
        id: 3,
        title: 'Historical',
        icon: "🏛️",
    },
    {
        id: 4,
        title: 'Adventure',
        icon: "⛰️",
    },
    {
        id: 5,
        title: 'Beach',
        icon: "🏖️",
    },
    {
        id: 6,
        title: 'Food & Cuisine',
        icon: "🍽️",
    },
    {
        id: 7,
        title: 'Wildlife',
        icon: "🐾",
    },
    {
        id: 8,
        title: 'Shopping',
        icon: "🛍️",
    },
    {
        id: 9,
        title: 'Cultural Experience',
        icon: "🎭",
    },
    {
        id: 10,
        title: 'Religious Sites',
        icon: "⛪",
    },
    {
        id: 11,
        title: 'Hiking',
        icon: "🥾",
    },
    {
        id: 12,
        title: 'Amusement Parks',
        icon: "🎢",
    },
    {
        id: 13,
        title: 'Art & Museums',
        icon: "🖼️",
    }
];

// Trip Type Options
export const SelectTripTypes = [
    {
        id: 1,
        title: 'Tourism',
        desc: "Explore attractions and experience the culture",
        icon: "🏝️",
        type: 'tourism',
    },
    {
        id: 2,
        title: 'Healthcare',
        desc: "Discover medical facilities and services",
        icon: "🏥",
        type: 'healthcare',
    },
    {
        id: 3,
        title: 'Education',
        desc: "Visit educational institutions and opportunities",
        icon: "🎓",
        type: 'education',
    },
];

// Healthcare Specialties
export const SelectHealthcareSpecialties = [
    {
        id: 1,
        title: 'General Medicine',
        icon: "👨‍⚕️",
    },
    {
        id: 2,
        title: 'Cardiology',
        icon: "❤️",
    },
    {
        id: 3,
        title: 'Orthopedics',
        icon: "🦴",
    },
    {
        id: 4,
        title: 'Dermatology',
        icon: "🧴",
    },
    {
        id: 5,
        title: 'Neurology',
        icon: "🧠",
    },
    {
        id: 6,
        title: 'Pediatrics',
        icon: "👶",
    },
    {
        id: 7,
        title: 'Oncology',
        icon: "🔬",
    },
    {
        id: 8,
        title: 'Dentistry',
        icon: "🦷",
    },
    {
        id: 9,
        title: 'Alternative Medicine',
        icon: "🧘‍♀️",
    },
];

// Educational Fields
export const SelectEducationalFields = [
    {
        id: 1,
        title: 'Universities',
        icon: "🏛️",
    },
    {
        id: 2,
        title: 'Technical Schools',
        icon: "⚙️",
    },
    {
        id: 3,
        title: 'Language Schools',
        icon: "🗣️",
    },
    {
        id: 4,
        title: 'Art & Design',
        icon: "🎨",
    },
    {
        id: 5,
        title: 'Business Schools',
        icon: "💼",
    },
    {
        id: 6,
        title: 'Medical Schools',
        icon: "⚕️",
    },
    {
        id: 7,
        title: 'Computer Science',
        icon: "💻",
    },
    {
        id: 8,
        title: 'Research Centers',
        icon: "🔭",
    },
];

// Import prompt constants from the service file
import { TRAVEL_PROMPT, HEALTHCARE_PROMPT, EDUCATION_PROMPT } from "@/service/AIModal";

export const AI_PROMPT = TRAVEL_PROMPT;