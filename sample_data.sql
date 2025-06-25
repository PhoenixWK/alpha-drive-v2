-- Sample Dataset for Alpha Drive Database
-- Execute this after creating the database schema

USE alpha_drive;

-- Insert sample nations
INSERT INTO nations (nation_id, plan_name) VALUES
('USA', 'United States'),
('CAN', 'Canada'),
('GBR', 'United Kingdom'),
('DEU', 'Germany'),
('FRA', 'France'),
('JPN', 'Japan'),
('AUS', 'Australia'),
('BRA', 'Brazil'),
('IND', 'India'),
('CHN', 'China');

-- Insert sample plans
INSERT INTO plan (plan_id, plan_name, storage_limit, created_at, updated_at) VALUES
('FREE01', 'Free Plan', 5368709120, '2024-01-01 00:00:00', '2024-01-01 00:00:00'), -- 5GB
('BASIC1', 'Basic Plan', 53687091200, '2024-01-01 00:00:00', '2024-01-01 00:00:00'), -- 50GB
('PRO001', 'Pro Plan', 536870912000, '2024-01-01 00:00:00', '2024-01-01 00:00:00'), -- 500GB
('PREM01', 'Premium Plan', 1073741824000, '2024-01-01 00:00:00', '2024-01-01 00:00:00'), -- 1TB
('ULTRA1', 'Ultra Plan', 5368709120000, '2024-01-01 00:00:00', '2024-01-01 00:00:00'); -- 5TB

-- Insert sample users (using UUID-like binary values converted from hex)
INSERT INTO users (user_id, username, email, password_hash, avatar_uri, first_name, last_name, is_active, created_at, updated_at) VALUES
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), 'john_doe', 'john.doe@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj1y7Q2/9z8i', 'https://example.com/avatars/john.jpg', 'John', 'Doe', TRUE, '2024-01-15 10:30:00', '2024-01-15 10:30:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', '')), 'jane_smith', 'jane.smith@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj1y7Q2/9z8j', 'https://example.com/avatars/jane.jpg', 'Jane', 'Smith', TRUE, '2024-01-16 14:22:00', '2024-01-16 14:22:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440003', '-', '')), 'mike_wilson', 'mike.wilson@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj1y7Q2/9z8k', NULL, 'Michael', 'Wilson', TRUE, '2024-01-17 09:15:00', '2024-01-17 09:15:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440004', '-', '')), 'sarah_johnson', 'sarah.johnson@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj1y7Q2/9z8l', 'https://example.com/avatars/sarah.jpg', 'Sarah', 'Johnson', TRUE, '2024-01-18 16:45:00', '2024-01-18 16:45:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440005', '-', '')), 'alex_brown', 'alex.brown@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj1y7Q2/9z8m', NULL, 'Alexander', 'Brown', FALSE, '2024-01-19 11:20:00', '2024-01-19 11:20:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440006', '-', '')), 'emma_davis', 'emma.davis@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj1y7Q2/9z8n', 'https://example.com/avatars/emma.jpg', 'Emma', 'Davis', TRUE, '2024-01-20 13:10:00', '2024-01-20 13:10:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440007', '-', '')), 'david_miller', 'david.miller@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj1y7Q2/9z8o', NULL, 'David', 'Miller', TRUE, '2024-01-21 08:30:00', '2024-01-21 08:30:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440008', '-', '')), 'lisa_garcia', 'lisa.garcia@email.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj1y7Q2/9z8p', 'https://example.com/avatars/lisa.jpg', 'Lisa', 'Garcia', TRUE, '2024-01-22 15:40:00', '2024-01-22 15:40:00');

-- Insert owned plans
INSERT INTO owned_plan (user_id, plan_id, nation_id, price, start_date, end_date) VALUES
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), 'PRO001', 'USA', 999, '2024-01-15 00:00:00', '2025-01-15 00:00:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', '')), 'BASIC1', 'CAN', 499, '2024-01-16 00:00:00', '2025-01-16 00:00:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440003', '-', '')), 'FREE01', 'GBR', 0, '2024-01-17 00:00:00', '2025-01-17 00:00:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440004', '-', '')), 'PREM01', 'USA', 1999, '2024-01-18 00:00:00', '2025-01-18 00:00:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440005', '-', '')), 'BASIC1', 'DEU', 499, '2024-01-19 00:00:00', '2025-01-19 00:00:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440006', '-', '')), 'PRO001', 'FRA', 999, '2024-01-20 00:00:00', '2025-01-20 00:00:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440007', '-', '')), 'FREE01', 'AUS', 0, '2024-01-21 00:00:00', '2025-01-21 00:00:00'),
(UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440008', '-', '')), 'ULTRA1', 'USA', 3999, '2024-01-22 00:00:00', '2025-01-22 00:00:00');

-- Insert OAuth connections
INSERT INTO user_oauth (oauth_id, provider_id, provider, created_at, user_id) VALUES
(UNHEX(REPLACE('660e8400-e29b-41d4-a716-446655440001', '-', '')), 'google_123456789', 'google', '2024-01-15 10:35:00', UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', ''))),
(UNHEX(REPLACE('660e8400-e29b-41d4-a716-446655440002', '-', '')), 'github_987654321', 'github', '2024-01-16 14:25:00', UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', ''))),
(UNHEX(REPLACE('660e8400-e29b-41d4-a716-446655440003', '-', '')), 'microsoft_456789123', 'microsoft', '2024-01-18 16:50:00', UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440004', '-', ''))),
(UNHEX(REPLACE('660e8400-e29b-41d4-a716-446655440004', '-', '')), 'google_789123456', 'google', '2024-01-20 13:15:00', UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440006', '-', ''))),
(UNHEX(REPLACE('660e8400-e29b-41d4-a716-446655440005', '-', '')), 'github_321654987', 'github', '2024-01-22 15:45:00', UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440008', '-', '')));

-- Insert folders
INSERT INTO folder (folder_id, parent_id, created_by, folder_name, created_at, updated_at) VALUES
-- Root folders
(UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440001', '-', '')), NULL, UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), 'Documents', '2024-01-15 11:00:00', '2024-01-15 11:00:00'),
(UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440002', '-', '')), NULL, UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), 'Photos', '2024-01-15 11:00:00', '2024-01-15 11:00:00'),
(UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440003', '-', '')), NULL, UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', '')), 'Work Projects', '2024-01-16 14:30:00', '2024-01-16 14:30:00'),
(UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440004', '-', '')), NULL, UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440003', '-', '')), 'Personal', '2024-01-17 09:20:00', '2024-01-17 09:20:00'),
-- Subfolders
(UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440005', '-', '')), UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440001', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), 'Contracts', '2024-01-15 11:15:00', '2024-01-15 11:15:00'),
(UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440006', '-', '')), UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440002', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), 'Vacation 2024', '2024-01-15 11:30:00', '2024-01-15 11:30:00'),
(UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440007', '-', '')), UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440003', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', '')), 'Client A', '2024-01-16 14:45:00', '2024-01-16 14:45:00'),
(UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440008', '-', '')), UNHEX(REPLACE('770e8400-e29b-41d4-a716-446655440003', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', '')), 'Client B', '2024-01-16 15:00:00', '2024-01-16 15:00:00');

-- Insert files
INSERT INTO files (file_id, created_by, file_name, file_extension, file_size, updated_at) VALUES
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440001', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), 'contract_template', 'docx', 245760, '2024-01-15 11:20:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440002', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), 'budget_2024', 'xlsx', 87424, '2024-01-15 11:45:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440003', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), 'beach_sunset', 'jpg', 2097152, '2024-01-15 12:00:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440004', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', '')), 'project_proposal', 'pdf', 1536000, '2024-01-16 15:10:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440005', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', '')), 'client_presentation', 'pptx', 5242880, '2024-01-16 15:30:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440006', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440003', '-', '')), 'readme', 'txt', 4096, '2024-01-17 09:30:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440007', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440004', '-', '')), 'financial_report', 'pdf', 3145728, '2024-01-18 17:00:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440008', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440004', '-', '')), 'company_logo', 'png', 512000, '2024-01-18 17:15:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440009', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440006', '-', '')), 'design_mockup', 'ai', 15728640, '2024-01-20 13:30:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440010', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440008', '-', '')), 'video_project', 'mp4', 1073741824, '2024-01-22 16:00:00');

-- Insert file permissions
INSERT INTO file_permissions (file_id, allow_share, is_locked, created_at, updated_at) VALUES
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440001', '-', '')), TRUE, FALSE, '2024-01-15 11:20:00', '2024-01-15 11:20:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440002', '-', '')), FALSE, TRUE, '2024-01-15 11:45:00', '2024-01-15 11:45:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440003', '-', '')), TRUE, FALSE, '2024-01-15 12:00:00', '2024-01-15 12:00:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440004', '-', '')), TRUE, FALSE, '2024-01-16 15:10:00', '2024-01-16 15:10:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440005', '-', '')), FALSE, FALSE, '2024-01-16 15:30:00', '2024-01-16 15:30:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440006', '-', '')), TRUE, FALSE, '2024-01-17 09:30:00', '2024-01-17 09:30:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440007', '-', '')), FALSE, TRUE, '2024-01-18 17:00:00', '2024-01-18 17:00:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440008', '-', '')), TRUE, FALSE, '2024-01-18 17:15:00', '2024-01-18 17:15:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440009', '-', '')), TRUE, FALSE, '2024-01-20 13:30:00', '2024-01-20 13:30:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440010', '-', '')), FALSE, FALSE, '2024-01-22 16:00:00', '2024-01-22 16:00:00');

-- Insert file versions
INSERT INTO file_versions (file_id, version_number, file_size, updated_at) VALUES
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440001', '-', '')), 'v1.0', 245760, '2024-01-15 11:20:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440002', '-', '')), 'v2.1', 87424, '2024-01-15 11:45:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440003', '-', '')), 'v1.0', 2097152, '2024-01-15 12:00:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440004', '-', '')), 'v1.3', 1536000, '2024-01-16 15:10:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440005', '-', '')), 'v3.0', 5242880, '2024-01-16 15:30:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440006', '-', '')), 'v1.0', 4096, '2024-01-17 09:30:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440007', '-', '')), 'v1.0', 3145728, '2024-01-18 17:00:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440008', '-', '')), 'v2.0', 512000, '2024-01-18 17:15:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440009', '-', '')), 'v1.5', 15728640, '2024-01-20 13:30:00'),
(UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440010', '-', '')), 'v1.0', 1073741824, '2024-01-22 16:00:00');

-- Insert shared files
INSERT INTO shared_files (id, file_id, shared_by, shared_to, shared_link_token, shared_at) VALUES
(UNHEX(REPLACE('990e8400-e29b-41d4-a716-446655440001', '-', '')), UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440001', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', '')), UNHEX(REPLACE('abc12345-1234-5678-9abc-123456789012', '-', '')), '2024-01-16 10:00:00'),
(UNHEX(REPLACE('990e8400-e29b-41d4-a716-446655440002', '-', '')), UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440003', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440004', '-', '')), NULL, '2024-01-16 12:30:00'),
(UNHEX(REPLACE('990e8400-e29b-41d4-a716-446655440003', '-', '')), UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440004', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440001', '-', '')), UNHEX(REPLACE('def67890-5678-9abc-def0-123456789013', '-', '')), '2024-01-17 14:00:00'),
(UNHEX(REPLACE('990e8400-e29b-41d4-a716-446655440004', '-', '')), UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440006', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440003', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440002', '-', '')), NULL, '2024-01-17 16:45:00'),
(UNHEX(REPLACE('990e8400-e29b-41d4-a716-446655440005', '-', '')), UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440008', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440004', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440006', '-', '')), UNHEX(REPLACE('ghi12345-9abc-def0-1234-567890abcdef', '-', '')), '2024-01-19 11:20:00'),
(UNHEX(REPLACE('990e8400-e29b-41d4-a716-446655440006', '-', '')), UNHEX(REPLACE('880e8400-e29b-41d4-a716-446655440009', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440006', '-', '')), UNHEX(REPLACE('550e8400-e29b-41d4-a716-446655440008', '-', '')), NULL, '2024-01-21 09:15:00');

-- Verification queries
SELECT 'Nations Count' as Table_Name, COUNT(*) as Record_Count FROM nations
UNION ALL
SELECT 'Plans Count', COUNT(*) FROM plan
UNION ALL
SELECT 'Users Count', COUNT(*) FROM users
UNION ALL
SELECT 'Owned Plans Count', COUNT(*) FROM owned_plan
UNION ALL
SELECT 'OAuth Connections Count', COUNT(*) FROM user_oauth
UNION ALL
SELECT 'Folders Count', COUNT(*) FROM folder
UNION ALL
SELECT 'Files Count', COUNT(*) FROM files
UNION ALL
SELECT 'File Permissions Count', COUNT(*) FROM file_permissions
UNION ALL
SELECT 'File Versions Count', COUNT(*) FROM file_versions
UNION ALL
SELECT 'Shared Files Count', COUNT(*) FROM shared_files; 