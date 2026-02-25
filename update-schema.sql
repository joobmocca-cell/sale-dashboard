-- Add username column to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "username" TEXT;

-- Update existing users with username from email
UPDATE "User" SET "username" = split_part("email", '@', 1) WHERE "username" IS NULL;

-- Make username unique and not null
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;
ALTER TABLE "User" ADD CONSTRAINT "User_username_key" UNIQUE ("username");

-- Create index on username
CREATE INDEX IF NOT EXISTS "User_username_idx" ON "User"("username");

-- Update admin user
UPDATE "User" 
SET "username" = 'admin', 
    "password" = '$2a$10$YourHashedPasswordHere'
WHERE "email" = 'admin@example.com';
