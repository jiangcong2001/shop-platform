-- Run this in Supabase SQL Editor to create all tables and policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Users table (extends Supabase auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  phone TEXT DEFAULT '',
  balance INTEGER DEFAULT 0,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles are readable by everyone, insertable by authenticated users, updatable by owners
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- Recharge requests
-- ============================================
CREATE TABLE recharge_requests (
  id BIGINT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  username TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ
);

ALTER TABLE recharge_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own recharges" ON recharge_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all recharges" ON recharge_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can insert own recharges" ON recharge_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update recharges" ON recharge_requests FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- Sell requests (store sale submissions)
-- ============================================
CREATE TABLE sell_requests (
  id BIGINT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  username TEXT NOT NULL,
  platform TEXT NOT NULL,
  category TEXT DEFAULT '',
  level TEXT DEFAULT '',
  rating TEXT DEFAULT '',
  price TEXT DEFAULT '',
  phone TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE sell_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert sell requests" ON sell_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view sell requests" ON sell_requests FOR SELECT USING (
  auth.uid() IS NOT NULL AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update sell requests" ON sell_requests FOR UPDATE USING (
  auth.uid() IS NOT NULL AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- Purchased stores
-- ============================================
CREATE TABLE purchased_stores (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  store_id INTEGER NOT NULL,
  store_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  category TEXT DEFAULT '',
  level TEXT DEFAULT '',
  price INTEGER NOT NULL,
  purchased_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE purchased_stores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own purchases" ON purchased_stores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own purchases" ON purchased_stores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all purchases" ON purchased_stores FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================
-- Create admin user trigger
-- When a user signs up with username 'admin', set role to admin
-- (You'll need to create the admin user manually via Supabase Auth UI first,
--  then run: UPDATE profiles SET role = 'admin' WHERE username = 'admin';)
-- ============================================
