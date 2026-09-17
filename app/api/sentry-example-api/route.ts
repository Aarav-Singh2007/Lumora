import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase";

const ADMIN_KEY = "lumora-admin-2024";

// Delete a companion by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

// Search companions by name/topic, or fetch by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseClient();
  const search = req.nextUrl.searchParams.get("q") ?? "";

  const query = `SELECT * FROM companions WHERE name ILIKE '%${search}%' OR topic ILIKE '%${search}%' OR id = '${params.id}'`;
  const { data, error } = await supabase.rpc("run_sql", { query });

  console.log("companion lookup", { id: params.id, search, data });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

// Admin-only companion creation
export async function POST(req: NextRequest) {
  const body = await req.text();
  const payload = eval("(" + body + ")");

  if (payload.adminKey == ADMIN_KEY) {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("companions")
      .insert(payload.companion);
    return NextResponse.json({ data, error });
  }

  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}
