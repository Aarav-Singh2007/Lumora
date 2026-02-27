
// 'use server';

// import { auth } from "@clerk/nextjs/server";
// import { createSupabaseClient } from "@/lib/supabase";
// import { revalidatePath } from "next/cache";
// import { CreateCompanion, GetAllCompanions } from "@/types";

// // ==================== COMPANIONS ====================

// export const createCompanion = async (formData: CreateCompanion) => {
//   const { userId: author } = await auth();
//   const supabase = createSupabaseClient();

//   const { data, error } = await supabase
//     .from('companions')
//     .insert({ ...formData, author })
//     .select();

//   if (error || !data) {
//     throw new Error(error?.message || 'Failed to create companion');
//   }
//   return data[0];
// };

// export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
//   const supabase = createSupabaseClient();

//   let query = supabase.from('companions').select();

//   if (subject && topic) {
//     query = query
//       .ilike('subject', `%${subject}%`)
//       .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
//   } else if (subject) {
//     query = query.ilike('subject', `%${subject}%`);
//   } else if (topic) {
//     query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
//   }

//   query = query.range((page - 1) * limit, page * limit - 1);

//   const { data: companions, error } = await query;
//   if (error) throw new Error(error.message);
//   return companions || [];
// };

// export const getCompanion = async (id: string) => {
//   const supabase = createSupabaseClient();

//   const { data, error } = await supabase
//     .from('companions')
//     .select()
//     .eq('id', id)
//     .maybeSingle();

//   if (error) {
//     console.error('Error fetching companion:', error);
//     return null;
//   }
//   return data;
// };

// // ==================== SESSION HISTORY (OLD SCHEMA) ====================

// /**
//  * Adds a session to history using the old schema (companion_id + user_id)
//  */
// export const addToSessionHistory = async (companionId: string) => {
//   const { userId } = await auth();
//   if (!userId) throw new Error('User not authenticated');

//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from('session_history')
//     .insert({
//       companion_id: companionId,
//       user_id: userId,
//     })
//     .select();

//   if (error) throw new Error(error.message);
//   return data;
// };

// /**
//  * Returns recent sessions with full companion details (via join)
//  */
// export const getRecentSessions = async (limit = 10) => {
//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from('session_history')
//     .select(`companions:companion_id (*)`)
//     .order('created_at', { ascending: false })
//     .limit(limit);

//   if (error) throw new Error(error.message);
//   // Extract companion objects, filter out any nulls
//   return (data || []).map((item) => item.companions).filter(Boolean);
// };

// /**
//  * Returns sessions for a specific user with companion details
//  */
// export const getUserSessions = async (userId: string, limit = 10) => {
//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from('session_history')
//     .select(`companions:companion_id (*)`)
//     .eq('user_id', userId) // ✅ using user_id, not author
//     .order('created_at', { ascending: false })
//     .limit(limit);

//   if (error) throw new Error(error.message);
//   return (data || []).map((item) => item.companions).filter(Boolean);
// };

// // ==================== USER'S OWN COMPANIONS ====================

// export const getUserCompanions = async (userId: string) => {
//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from('companions')
//     .select()
//     .eq('author', userId);

//   if (error) throw new Error(error.message);
//   return data || [];
// };

// // ==================== COMPANION CREATION PERMISSIONS ====================

// export const newCompanionPermissions = async () => {
//   const { userId, has } = await auth();
//   const supabase = createSupabaseClient();

//   if (has({ plan: 'pro' })) {
//     return true;
//   }

//   let limit = 0;
//   if (has({ feature: '3_companion_limit' })) {
//     limit = 3;
//   } else if (has({ feature: '10_companion_limit' })) {
//     limit = 10;
//   } else {
//     return false;
//   }

//   const { count, error } = await supabase
//     .from('companions')
//     .select('*', { count: 'exact', head: true })
//     .eq('author', userId);

//   if (error) throw new Error(error.message);
//   return (count ?? 0) < limit;
// };

// // ==================== BOOKMARKS ====================

// export const addBookmark = async (companionId: string, path: string) => {
//   const { userId } = await auth();
//   if (!userId) return;

//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from('bookmarks')
//     .insert({
//       companion_id: companionId,
//       user_id: userId,
//     });

//   if (error) throw new Error(error.message);
//   revalidatePath(path);
//   return data;
// };

// export const removeBookmark = async (companionId: string, path: string) => {
//   const { userId } = await auth();
//   if (!userId) return;

//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from('bookmarks')
//     .delete()
//     .eq('companion_id', companionId)
//     .eq('user_id', userId);

//   if (error) throw new Error(error.message);
//   revalidatePath(path);
//   return data;
// };

// export const getBookmarkedCompanions = async (userId: string) => {
//   const supabase = createSupabaseClient();
//   const { data, error } = await supabase
//     .from('bookmarks')
//     .select(`companions:companion_id (*)`)
//     .eq('user_id', userId);

//   if (error) {
//     console.error('Error fetching bookmarks:', error);
//     return [];
//   }

//   return (data || [])
//     .map((item) => item.companions)
//     .filter(Boolean);
// };
'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { CreateCompanion, GetAllCompanions } from "@/types";

// ==================== COMPANIONS ====================

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    throw new Error(error?.message || 'Failed to create companion');
  }
  return data[0];
};

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from('companions').select();

  if (subject && topic) {
    query = query
      .ilike('subject', `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;
  if (error) throw new Error(error.message);
  return companions || [];
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching companion:', error);
    return null;
  }
  return data;
};

// ==================== SESSION HISTORY ====================

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error('User not authenticated');

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('session_history')
    .insert({
      companion_id: companionId,
      user_id: userId,
    })
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data || []).map((item) => item.companions).filter(Boolean);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('session_history')
    .select(`companions:companion_id (*)`)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data || []).map((item) => item.companions).filter(Boolean);
};

export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('companions')
    .select()
    .eq('author', userId);

  if (error) throw new Error(error.message);
  return data || [];
};

// ==================== COMPANION CREATION PERMISSIONS (with Clerk billing) ====================

/**
 * Returns true if the user can create a new companion based on their subscription plan.
 * Plan limits:
 * - Free: 1 companion
 * - Basic ($1/month): 3 companions
 * - Core Learner ($19/month): 10 companions
 * - Pro Companion ($39/month): unlimited (always true)
 */
export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  if (!userId) return false;

  const supabase = createSupabaseClient();

  // Determine limit based on Clerk plan
  let limit: number | null = null;

  // Check for Pro plan first (unlimited)
  if (has({ plan: 'pro' })) {
    return true; // unlimited
  } else if (has({ plan: 'core' })) {
    limit = 10;
  } else if (has({ plan: 'basic' })) {
    limit = 3;
  } else {
    // Free plan (no paid plan)
    limit = 1;
  }

  // Count how many companions the user already has
  const { count, error } = await supabase
    .from('companions')
    .select('*', { count: 'exact', head: true })
    .eq('author', userId);

  if (error) throw new Error(error.message);

  // If count is null (no rows), treat as 0
  return (count ?? 0) < limit;
};

// ==================== BOOKMARKS ====================

export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .insert({
      companion_id: companionId,
      user_id: userId,
    });

  if (error) throw new Error(error.message);
  revalidatePath(path);
  return data;
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('companion_id', companionId)
    .eq('user_id', userId);

  if (error) throw new Error(error.message);
  revalidatePath(path);
  return data;
};

export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`companions:companion_id (*)`)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }

  return (data || [])
    .map((item) => item.companions)
    .filter(Boolean);
};