
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const signUp = async (email: string, password: string, fullName: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) throw error;
    
    toast.success("Account created successfully!");
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error(error instanceof Error ? error.message : "Failed to create account");
    return null;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    
    toast.success("Signed in successfully!");
    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    toast.error(error instanceof Error ? error.message : "Failed to sign in");
    return null;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    toast.success("Signed out successfully");
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error(error instanceof Error ? error.message : "Failed to sign out");
    return false;
  }
};
