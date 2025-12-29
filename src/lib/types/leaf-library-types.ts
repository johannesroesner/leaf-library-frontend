// user
export type Role = "default" | "admin";

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  aboutMe: string | null;
  imageUrl: string | null;
  role: Role;
}

export type NewUser = Omit<User, "_id" | "aboutMe" | "imageUrl" | "role">;
export type UserCredential = Omit<
  User,
  "_id" | "aboutMe" | "imageUrl" | "firstName" | "secondName"
>;

export type Profile = Omit<User, "password">;

// plant
export const PlantTypeArray = [
  "Tree",
  "Flower",
  "Fern",
  "Moss",
  "Grass",
  "Aquatic Plant",
  "Climber",
  "Other"
] as const;

export type PlantType = (typeof PlantTypeArray)[number];

export const BiomeArray = [
  "Urban",
  "Meadow",
  "Forest",
  "Pond",
  "River",
  "Sea",
  "Desert",
  "Other"
] as const;

export type Biome = (typeof BiomeArray)[number];

export interface Plant {
  _id: string;
  commonName: string;
  scientificName: string;
  type: PlantType;
  biome: Biome;
  imageUrls: string[] | null;
  note: string | null;
  date: Date;
  latitude: number;
  longitude: number;
  userId: string;
}

export type NewPlant = Omit<Plant, "_id" | "userId" | "date">;

// collection
export interface Collection {
  _id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  userId: string;
  plantIds: string[];
}

export type NewCollection = Omit<Collection, "_id" | "userId" | "plantIds">;
