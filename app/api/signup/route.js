import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }
    if (password.length < 6) {
      return Response.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists with this email." }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return Response.json({ message: "Account created successfully!", user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Signup Error:", error);
    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}