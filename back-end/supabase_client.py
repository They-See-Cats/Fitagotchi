import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Get the path to the .env file
current_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(current_dir, '..', 'front-end', '.env')

# Load environment variables from the .env file
load_dotenv(dotenv_path=env_path)

# Retrieve Supabase credentials from the environment variables
SUPABASE_URL = os.environ.get("EXPO_PUBLIC_SUPABASE_URL")
SUPABASE_ANON_KEY = os.environ.get("EXPO_PUBLIC_SUPABASE_ANON_KEY")

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

if __name__ == "__main__":
    # For testing purposes, print a success message
    print("Supabase client created successfully!")