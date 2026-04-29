import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "developer";
  const location = searchParams.get("location") || "india";
  const page = searchParams.get("page") || "1";

  try {
    // Using Adzuna API (free tier - 250 calls/month)
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    if (!appId || !appKey) {
      // Return mock data if no API keys configured
      return NextResponse.json({ success: true, jobs: getMockJobs(query), total: 10, isMock: true });
    }

    const url = `https://api.adzuna.com/v1/api/jobs/in/search/${page}?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(query)}&where=${encodeURIComponent(location)}&results_per_page=12&content-type=application/json`;

    const res = await fetch(url);
    const data = await res.json();

    const jobs = (data.results || []).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company?.display_name || "Unknown Company",
      location: job.location?.display_name || location,
      salary: job.salary_min ? `₹${Math.round(job.salary_min / 1000)}K - ₹${Math.round(job.salary_max / 1000)}K` : "Not disclosed",
      type: job.contract_time || "Full-time",
      description: job.description?.substring(0, 200) + "...",
      url: job.redirect_url,
      created: job.created,
      category: job.category?.label || "Technology",
    }));

    return NextResponse.json({ success: true, jobs, total: data.count || 0, isMock: false });
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json({ success: true, jobs: getMockJobs(query), total: 10, isMock: true });
  }
}

function getMockJobs(query) {
  const companies = ["TCS", "Infosys", "Wipro", "Google India", "Microsoft", "Amazon", "Flipkart", "Swiggy", "Zomato", "Razorpay", "CRED", "Meesho"];
  const locations = ["Bangalore", "Mumbai", "Hyderabad", "Pune", "Chennai", "Delhi NCR", "Remote"];
  const types = ["Full-time", "Remote", "Hybrid", "Contract"];

  return Array.from({ length: 12 }, (_, i) => ({
    id: `mock-${i}`,
    title: `${query.charAt(0).toUpperCase() + query.slice(1)} Engineer ${["I", "II", "III", "Senior", "Lead"][i % 5]}`,
    company: companies[i % companies.length],
    location: locations[i % locations.length],
    salary: `₹${8 + i * 2}L - ₹${14 + i * 2}L`,
    type: types[i % types.length],
    description: `We are looking for a talented ${query} professional to join our team. You will work on exciting projects and collaborate with a world-class team...`,
    url: "#",
    created: new Date(Date.now() - i * 86400000).toISOString(),
    category: "Technology",
  }));
}
