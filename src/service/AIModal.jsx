import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


 export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "location": "Las Vegas, NV",\n  "budget": "Cheap",\n  "travelers": "Couple",\n  "duration": "3 Days",\n  "hotels": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "$40 - $80 per night",\n      "hotelImageURL": "https://media-cdn.tripadvisor.com/media/photo-s/26/39/f6/f0/circus-circus-hotel-and.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1235,\n        "longitude": -115.1691\n      },\n      "rating": 3.5,\n      "description": "A classic Las Vegas hotel with a carnival theme. Offers budget-friendly rooms and a variety of entertainment options, including a circus and an indoor amusement park."\n    },\n     {\n      "hotelName": "Excalibur Hotel & Casino",\n      "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "$50 - $90 per night",\n      "hotelImageURL": "https://media-cdn.tripadvisor.com/media/photo-s/26/9a/c4/b6/excalibur-hotel-and-casino.jpg",\n      "geoCoordinates": {\n        "latitude": 36.0985,\n        "longitude": -115.1740\n      },\n       "rating": 4.0,\n      "description": "A medieval-themed hotel with a castle-like exterior. Provides affordable accommodations and a variety of dining and entertainment options."\n    },\n    {\n      "hotelName": "OYO Hotel and Casino Las Vegas",\n      "hotelAddress": "115 E Tropicana Ave, Las Vegas, NV 89109",\n      "price": "$35 - $75 per night",\n      "hotelImageURL": "https://media-cdn.tripadvisor.com/media/photo-s/29/2c/79/89/oyo-hotel-and-casino-las.jpg",\n      "geoCoordinates": {\n         "latitude": 36.0992,\n        "longitude": -115.1712\n      },\n      "rating": 3.0,\n      "description": "A budget-friendly hotel with basic amenities and a casino. It offers a no-frills option for travelers looking to save money."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "theme": "Exploring the Strip",\n       "bestTimeToVisit": "Late Afternoon/Evening",\n      "places": [\n        {\n          "placeName": "The Las Vegas Strip",\n          "placeDetails": "Walk along the iconic Las Vegas Strip, admire the themed hotels, and watch the Bellagio Fountains show.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Las_Vegas_Strip_at_night.jpg/1280px-Las_Vegas_Strip_at_night.jpg",\n           "geoCoordinates": {\n              "latitude": 36.1146,\n              "longitude": -115.1728\n            },\n           "ticketPricing": "Free (Except for specific attractions)",\n          "timeToTravel": "Walkable"\n        },\n         {\n          "placeName": "Bellagio Fountains",\n          "placeDetails": "Witness the spectacular water show synchronized to music at the Bellagio.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Bellagio_Fountains_at_Night.jpg/1280px-Bellagio_Fountains_at_Night.jpg",\n          "geoCoordinates": {\n             "latitude": 36.1129,\n              "longitude": -115.1743\n          },\n          "ticketPricing": "Free",\n          "timeToTravel": "Walkable from the Strip"\n        },\n          {\n          "placeName": "Mirage Volcano",\n          "placeDetails": "Enjoy the fiery eruption of the Mirage Volcano.",\n           "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Mirage_Volcano_Las_Vegas.jpg/1280px-Mirage_Volcano_Las_Vegas.jpg",\n          "geoCoordinates": {\n           "latitude": 36.1212,\n            "longitude": -115.1741\n          },\n          "ticketPricing": "Free",\n          "timeToTravel": "Walkable from Bellagio"\n        }\n\n      ]\n    },\n    "day2": {\n      "theme": "Downtown & Fremont Street Experience",\n      "bestTimeToVisit": "Evening",\n      "places": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "Experience the vibrant pedestrian mall with its light shows and street performers.",\n           "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Fremont_Street_Experience_canopy.jpg/1280px-Fremont_Street_Experience_canopy.jpg",\n            "geoCoordinates": {\n             "latitude": 36.1703,\n              "longitude": -115.1400\n            },\n          "ticketPricing": "Free",\n          "timeToTravel": "15-20 minutes drive from the Strip (Consider bus)"\n        },\n        {\n          "placeName": "Downtown Las Vegas",\n          "placeDetails": "Explore the historical part of Vegas, with its unique casinos and restaurants.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Downtown_Las_Vegas_2018.jpg/1280px-Downtown_Las_Vegas_2018.jpg",\n            "geoCoordinates": {\n              "latitude": 36.1699,\n              "longitude": -115.1400\n            },\n          "ticketPricing":"Free (Except food and drinks)",\n          "timeToTravel": "Walkable from Fremont Street"\n        },\n        {\n          "placeName": "Container Park",\n          "placeDetails": "Visit this open-air shopping and entertainment space made from shipping containers.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/ContainerParkLasVegas.jpg/1280px-ContainerParkLasVegas.jpg",\n          "geoCoordinates": {\n              "latitude": 36.1695,\n               "longitude": -115.1386\n            },\n          "ticketPricing": "Free (Except shopping and food)",\n           "timeToTravel": "Walkable from Downtown"\n        }\n      ]\n    },\n    "day3": {\n      "theme": "Free Attractions & Departure",\n      "bestTimeToVisit": "Morning/Afternoon",\n      "places": [\n         {\n          "placeName": "Seven Magic Mountains",\n           "placeDetails": "Take pictures at the colorful art installation located south of Las Vegas.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Seven_Magic_Mountains_by_Ugo_Rondinone.jpg/1280px-Seven_Magic_Mountains_by_Ugo_Rondinone.jpg",\n          "geoCoordinates": {\n            "latitude": 35.9831,\n            "longitude": -115.2715\n            },\n          "ticketPricing": "Free",\n           "timeToTravel": "20-25 minutes drive from the Strip"\n        },\n        {\n          "placeName": "Free Shows on the Strip",\n          "placeDetails": "Catch one of the many free shows throughout the day, like street performers or lobby displays",\n           "placeImageURL": "https://www.reviewjournal.com/wp-content/uploads/2023/08/17331819_web1_Las-Vegas-Street-Performers-071423-LVE001-scaled.jpg",\n           "geoCoordinates": {\n               "latitude": 36.1146,\n              "longitude": -115.1728\n            },\n          "ticketPricing": "Free",\n           "timeToTravel":"Walkable"\n        }\n       ]\n    }\n  }\n}\n```',
          },
        ],
      },
    ],
  });


