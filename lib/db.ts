import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalWithMongoose.mongooseCache = cached;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  const mongodbUri = process.env.MONGODB_URI;

  if (!mongodbUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongodbUri).catch((error: unknown) => {
      cached.promise = null;
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
