-- =====================================================
-- LETVANA RENTAL PLATFORM DATABASE SCHEMA
-- PostgreSQL DATABASE
-- =====================================================
-- Based on PRD requirements for LETVANA rental platform
-- Features: Property search, listings, payments, chat, verification

-- Create database and extensions
CREATE DATABASE letvana_rental_db;

-- Connect to the database
\c letvana_rental_db;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- CUSTOM TYPES (ENUMS)
-- =====================================================

CREATE TYPE user_type_enum AS ENUM ('tenant', 'landlord', 'agent');
CREATE TYPE verification_status_enum AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE property_type_enum AS ENUM ('apartment', 'house', 'land', 'office_space', 'shop', 'warehouse');
CREATE TYPE property_status_enum AS ENUM ('available', 'rented', 'sold', 'draft', 'under_review');
CREATE TYPE media_type_enum AS ENUM ('photo', 'video');
CREATE TYPE notification_frequency_enum AS ENUM ('immediate', 'daily', 'weekly');
CREATE TYPE notification_method_enum AS ENUM ('email', 'in_app', 'both');
CREATE TYPE conversation_status_enum AS ENUM ('active', 'closed', 'archived');
CREATE TYPE message_type_enum AS ENUM ('text', 'inquiry', 'scheduling', 'system');
CREATE TYPE screening_status_enum AS ENUM ('pending', 'submitted', 'approved', 'rejected', 'expired');
CREATE TYPE document_type_enum AS ENUM ('id_card', 'drivers_license', 'passport', 'employment_letter', 'bank_statement', 'other');
CREATE TYPE verification_doc_status_enum AS ENUM ('pending', 'verified', 'failed', 'manual_review');
CREATE TYPE payment_type_enum AS ENUM ('card', 'bank_transfer', 'mobile_wallet', 'ussd');
CREATE TYPE agreement_status_enum AS ENUM ('active', 'expired', 'terminated', 'pending');
CREATE TYPE rent_payment_type_enum AS ENUM ('rent', 'security_deposit', 'late_fee', 'other');
CREATE TYPE payment_status_enum AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
CREATE TYPE notification_type_enum AS ENUM ('email', 'in_app', 'sms', 'push');
CREATE TYPE notification_status_enum AS ENUM ('pending', 'sent', 'failed', 'cancelled');
CREATE TYPE notification_category_enum AS ENUM ('messages', 'payments', 'alerts', 'reminders', 'system');
CREATE TYPE admin_role_enum AS ENUM ('super_admin', 'property_verifier', 'customer_support', 'content_moderator');
CREATE TYPE setting_type_enum AS ENUM ('string', 'number', 'boolean', 'json');
CREATE TYPE online_viewing_type_enum AS ENUM ('video_tour', 'live_call');

-- =====================================================
-- USER MANAGEMENT TABLES
-- =====================================================

-- Users table for authentication and profile management
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    user_type user_type_enum NOT NULL,
    profile_picture_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP,
    phone_verified_at TIMESTAMP,
    verification_status verification_status_enum DEFAULT 'pending',
    verification_documents JSONB,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Create indexes for users table
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_verification_status ON users(verification_status);
CREATE INDEX idx_users_active ON users(is_active);

-- Password reset tokens
CREATE TABLE password_reset_tokens (
    token_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_password_reset_token ON password_reset_tokens(token);
CREATE INDEX idx_password_reset_expires ON password_reset_tokens(expires_at);

-- User sessions for authentication tracking
CREATE TABLE user_sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);

-- =====================================================
-- PROPERTY MANAGEMENT TABLES
-- =====================================================

-- Property listings table
CREATE TABLE properties (
    property_id BIGSERIAL PRIMARY KEY,
    owner_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    property_type property_type_enum NOT NULL,
    bedrooms SMALLINT,
    bathrooms SMALLINT,
    toilets SMALLINT,
    price DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'NGN',
    status property_status_enum DEFAULT 'draft',
    
    -- Location details
    state VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100),
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Property features
    amenities JSONB, -- Swimming pool, generator, furnished, serviced, parking, security, borehole
    furnished BOOLEAN DEFAULT FALSE,
    serviced BOOLEAN DEFAULT FALSE,
    parking_spaces SMALLINT DEFAULT 0,
    
    -- Verification and quality
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by BIGINT,
    verified_at TIMESTAMP,
    verification_notes TEXT,
    
    -- Online viewing
    online_viewing_enabled BOOLEAN DEFAULT FALSE,
    online_viewing_type online_viewing_type_enum DEFAULT 'video_tour',
    video_tour_url VARCHAR(500),
    
    -- Walk-in inspection details
    inspection_available BOOLEAN DEFAULT TRUE,
    inspection_notes TEXT,
    inspection_contact VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    
    FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(user_id) ON DELETE SET NULL
);

-- Create indexes for properties table
CREATE INDEX idx_properties_owner_id ON properties(owner_id);
CREATE INDEX idx_properties_property_type ON properties(property_type);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_location ON properties(state, city);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX idx_properties_verified ON properties(is_verified);
CREATE INDEX idx_properties_location_coords ON properties(latitude, longitude);
CREATE INDEX idx_properties_created_at ON properties(created_at);
CREATE INDEX idx_properties_search ON properties(property_type, state, city, bedrooms, price, status);

-- Property photos and videos
CREATE TABLE property_media (
    media_id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    media_type media_type_enum NOT NULL,
    media_url VARCHAR(500) NOT NULL,
    media_title VARCHAR(255),
    display_order SMALLINT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE
);

CREATE INDEX idx_property_media_property_id ON property_media(property_id);
CREATE INDEX idx_property_media_type ON property_media(media_type);
CREATE INDEX idx_property_media_display_order ON property_media(display_order);

-- =====================================================
-- SEARCH AND FAVORITES MANAGEMENT
-- =====================================================

-- User saved/favorite properties
CREATE TABLE user_favorites (
    user_id BIGINT NOT NULL,
    property_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (user_id, property_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE
);

CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_user_favorites_created_at ON user_favorites(created_at);

-- Saved search alerts
CREATE TABLE search_alerts (
    alert_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    alert_name VARCHAR(255) NOT NULL,
    search_criteria JSONB NOT NULL, -- Store all search filters as JSON
    notification_frequency notification_frequency_enum DEFAULT 'daily',
    notification_method notification_method_enum DEFAULT 'both',
    is_active BOOLEAN DEFAULT TRUE,
    last_sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_search_alerts_user_id ON search_alerts(user_id);
CREATE INDEX idx_search_alerts_active ON search_alerts(is_active);
CREATE INDEX idx_search_alerts_frequency ON search_alerts(notification_frequency);

-- =====================================================
-- COMMUNICATION SYSTEM
-- =====================================================

-- Conversations between users
CREATE TABLE conversations (
    conversation_id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    tenant_id BIGINT NOT NULL,
    landlord_id BIGINT NOT NULL,
    status conversation_status_enum DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (landlord_id) REFERENCES users(user_id) ON DELETE CASCADE,
    
    UNIQUE (property_id, tenant_id, landlord_id)
);

CREATE INDEX idx_conversations_property_id ON conversations(property_id);
CREATE INDEX idx_conversations_tenant_id ON conversations(tenant_id);
CREATE INDEX idx_conversations_landlord_id ON conversations(landlord_id);
CREATE INDEX idx_conversations_status ON conversations(status);

-- Messages within conversations
CREATE TABLE messages (
    message_id BIGSERIAL PRIMARY KEY,
    conversation_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    message_type message_type_enum DEFAULT 'text',
    subject VARCHAR(255),
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_is_read ON messages(is_read);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_messages_conversation_read ON messages(conversation_id, is_read, created_at);

-- =====================================================
-- TENANT SCREENING SYSTEM
-- =====================================================

-- Tenant screening requests
CREATE TABLE screening_requests (
    request_id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    tenant_id BIGINT NOT NULL,
    landlord_id BIGINT NOT NULL,
    request_status screening_status_enum DEFAULT 'pending',
    requested_documents JSONB, -- List of required documents
    screening_notes TEXT,
    decision_notes TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (landlord_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_screening_requests_property_id ON screening_requests(property_id);
CREATE INDEX idx_screening_requests_tenant_id ON screening_requests(tenant_id);
CREATE INDEX idx_screening_requests_landlord_id ON screening_requests(landlord_id);
CREATE INDEX idx_screening_requests_status ON screening_requests(request_status);
CREATE INDEX idx_screening_requests_expires_at ON screening_requests(expires_at);

-- Submitted screening documents
CREATE TABLE screening_documents (
    document_id BIGSERIAL PRIMARY KEY,
    request_id BIGINT NOT NULL,
    document_type document_type_enum NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    verification_status verification_doc_status_enum DEFAULT 'pending',
    verification_details JSONB,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (request_id) REFERENCES screening_requests(request_id) ON DELETE CASCADE
);

CREATE INDEX idx_screening_documents_request_id ON screening_documents(request_id);
CREATE INDEX idx_screening_documents_document_type ON screening_documents(document_type);
CREATE INDEX idx_screening_documents_verification_status ON screening_documents(verification_status);

-- =====================================================
-- PAYMENT SYSTEM
-- =====================================================

-- Payment methods
CREATE TABLE payment_methods (
    payment_method_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    payment_type payment_type_enum NOT NULL,
    payment_provider VARCHAR(100), -- Paystack, Flutterwave, etc.
    account_details JSONB, -- Encrypted payment details
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_payment_methods_user_id ON payment_methods(user_id);
CREATE INDEX idx_payment_methods_payment_type ON payment_methods(payment_type);
CREATE INDEX idx_payment_methods_active ON payment_methods(is_active);

-- Rental agreements
CREATE TABLE rental_agreements (
    agreement_id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL,
    tenant_id BIGINT NOT NULL,
    landlord_id BIGINT NOT NULL,
    monthly_rent DECIMAL(12,2) NOT NULL,
    security_deposit DECIMAL(12,2),
    agreement_start_date DATE NOT NULL,
    agreement_end_date DATE NOT NULL,
    payment_due_day SMALLINT DEFAULT 1, -- Day of month rent is due
    status agreement_status_enum DEFAULT 'pending',
    agreement_document_url VARCHAR(500),
    terms_and_conditions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE,
    FOREIGN KEY (tenant_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (landlord_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_rental_agreements_property_id ON rental_agreements(property_id);
CREATE INDEX idx_rental_agreements_tenant_id ON rental_agreements(tenant_id);
CREATE INDEX idx_rental_agreements_landlord_id ON rental_agreements(landlord_id);
CREATE INDEX idx_rental_agreements_status ON rental_agreements(status);
CREATE INDEX idx_rental_agreements_dates ON rental_agreements(agreement_start_date, agreement_end_date);

-- Rent payments
CREATE TABLE rent_payments (
    payment_id BIGSERIAL PRIMARY KEY,
    agreement_id BIGINT NOT NULL,
    payment_method_id BIGINT,
    amount DECIMAL(12,2) NOT NULL,
    payment_type rent_payment_type_enum DEFAULT 'rent',
    due_date DATE NOT NULL,
    payment_status payment_status_enum DEFAULT 'pending',
    payment_date TIMESTAMP,
    gateway_transaction_id VARCHAR(255),
    gateway_response JSONB,
    receipt_url VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (agreement_id) REFERENCES rental_agreements(agreement_id) ON DELETE CASCADE,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(payment_method_id) ON DELETE SET NULL
);

CREATE INDEX idx_rent_payments_agreement_id ON rent_payments(agreement_id);
CREATE INDEX idx_rent_payments_payment_status ON rent_payments(payment_status);
CREATE INDEX idx_rent_payments_due_date ON rent_payments(due_date);
CREATE INDEX idx_rent_payments_payment_date ON rent_payments(payment_date);
CREATE INDEX idx_rent_payments_gateway_transaction_id ON rent_payments(gateway_transaction_id);
CREATE INDEX idx_rent_payments_tenant_status ON rent_payments(agreement_id, payment_status, due_date);

-- =====================================================
-- NOTIFICATION SYSTEM
-- =====================================================

-- Notification templates
CREATE TABLE notification_templates (
    template_id SERIAL PRIMARY KEY,
    template_name VARCHAR(100) NOT NULL UNIQUE,
    notification_type notification_type_enum NOT NULL,
    subject VARCHAR(255),
    body TEXT NOT NULL,
    variables JSONB, -- variables like {first_name}, {property_title}
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User notification preferences
CREATE TABLE user_notification_preferences (
    user_id BIGINT NOT NULL,
    notification_type notification_type_enum NOT NULL,
    category notification_category_enum NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (user_id, notification_type, category),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Notification queue
CREATE TABLE notifications (
    notification_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    template_id INTEGER,
    notification_type notification_type_enum NOT NULL,
    subject VARCHAR(255),
    body TEXT NOT NULL,
    status notification_status_enum DEFAULT 'pending',
    sent_at TIMESTAMP,
    read_at TIMESTAMP,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    scheduled_at TIMESTAMP,
    metadata JSONB, -- Additional data like property_id, conversation_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (template_id) REFERENCES notification_templates(template_id) ON DELETE SET NULL
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_notification_type ON notifications(notification_type);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_scheduled_at ON notifications(scheduled_at);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
CREATE INDEX idx_notifications_user_status ON notifications(user_id, status, notification_type);

-- =====================================================
-- SYSTEM ADMINISTRATION
-- =====================================================

-- Admin users and roles
CREATE TABLE admin_users (
    admin_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role admin_role_enum NOT NULL,
    permissions JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_active ON admin_users(is_active);

-- Activity logs for audit trail
CREATE TABLE activity_logs (
    log_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    admin_id BIGINT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50), -- properties, users, payments, etc.
    entity_id BIGINT,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (admin_id) REFERENCES admin_users(admin_id) ON DELETE SET NULL
);

CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_admin_id ON activity_logs(admin_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- System settings
CREATE TABLE system_settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT,
    setting_type setting_type_enum DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_search_alerts_updated_at BEFORE UPDATE ON search_alerts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_screening_requests_updated_at BEFORE UPDATE ON screening_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_methods_updated_at BEFORE UPDATE ON payment_methods 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rental_agreements_updated_at BEFORE UPDATE ON rental_agreements 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rent_payments_updated_at BEFORE UPDATE ON rent_payments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_templates_updated_at BEFORE UPDATE ON notification_templates 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_notification_preferences_updated_at BEFORE UPDATE ON user_notification_preferences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INITIAL DATA INSERTION - This is just for testing purposes
-- =====================================================

-- Insert notification templates
INSERT INTO notification_templates (template_name, notification_type, subject, body, variables) VALUES
('welcome_email', 'email', 'Welcome to our Property Platform!', 'Hello {{first_name}}, welcome to our platform! Start exploring properties in Nigeria.', '["first_name"]'),
('property_inquiry', 'email', 'New Property Inquiry', 'Hello {{landlord_name}}, {{tenant_name}} is interested in your property: {{property_title}}', '["landlord_name", "tenant_name", "property_title"]'),
('new_listing_alert', 'email', 'New Properties Match Your Search!', 'Hello {{first_name}}, we found {{count}} new properties matching your saved search.', '["first_name", "count"]'),
('payment_reminder', 'email', 'Rent Payment Reminder', 'Hello {{tenant_name}}, your rent payment of {{amount}} is due on {{due_date}}.', '["tenant_name", "amount", "due_date"]'),
('payment_confirmation', 'email', 'Payment Received', 'Hello {{tenant_name}}, we have received your rent payment of {{amount}}. Receipt attached.', '["tenant_name", "amount"]'),
('screening_request', 'email', 'Tenant Screening Request', 'Hello {{tenant_name}}, {{landlord_name}} has requested tenant screening for {{property_title}}.', '["tenant_name", "landlord_name", "property_title"]');

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('app_name', 'Nigerian Property Rental Platform', 'string', 'Application name', true),
('app_version', '1.0.0', 'string', 'Application version', true),
('max_photos_per_property', '20', 'number', 'Maximum photos allowed per property', false),
('max_file_size_mb', '10', 'number', 'Maximum file size for uploads in MB', false),
('payment_gateway_primary', 'paystack', 'string', 'Primary payment gateway', false),
('verification_required_for_listings', 'false', 'boolean', 'Whether property verification is required before listing', false),
('default_currency', 'NGN', 'string', 'Default currency for the platform', true);

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- Active properties with owner details
CREATE VIEW active_properties_view AS
SELECT 
    p.property_id,
    p.title,
    p.property_type,
    p.bedrooms,
    p.bathrooms,
    p.price,
    p.currency,
    p.state,
    p.city,
    p.neighborhood,
    p.is_verified,
    u.first_name as owner_first_name,
    u.last_name as owner_last_name,
    u.phone_number as owner_phone,
    u.user_type as owner_type,
    COUNT(pm.media_id) as media_count,
    (SELECT pm2.media_url FROM property_media pm2 
     WHERE pm2.property_id = p.property_id AND pm2.media_type = 'photo' 
     ORDER BY pm2.display_order LIMIT 1) as primary_image
FROM properties p
JOIN users u ON p.owner_id = u.user_id
LEFT JOIN property_media pm ON p.property_id = pm.property_id AND pm.media_type = 'photo'
WHERE p.status = 'available' 
    AND p.deleted_at IS NULL
    AND u.is_active = true
GROUP BY p.property_id, u.first_name, u.last_name, u.phone_number, u.user_type;

-- User conversation summary
CREATE VIEW user_conversations_view AS
SELECT 
    c.conversation_id,
    c.property_id,
    p.title as property_title,
    c.tenant_id,
    CONCAT(t.first_name, ' ', t.last_name) as tenant_name,
    c.landlord_id,
    CONCAT(l.first_name, ' ', l.last_name) as landlord_name,
    c.status,
    COUNT(m.message_id) as total_messages,
    COUNT(CASE WHEN m.is_read = false AND m.sender_id != c.tenant_id THEN 1 END) as unread_by_tenant,
    COUNT(CASE WHEN m.is_read = false AND m.sender_id != c.landlord_id THEN 1 END) as unread_by_landlord,
    MAX(m.created_at) as last_message_at
FROM conversations c
JOIN properties p ON c.property_id = p.property_id
JOIN users t ON c.tenant_id = t.user_id
JOIN users l ON c.landlord_id = l.user_id
LEFT JOIN messages m ON c.conversation_id = m.conversation_id
GROUP BY c.conversation_id, p.title, t.first_name, t.last_name, l.first_name, l.last_name, c.status;

-- Payment summary view
CREATE VIEW payment_summary_view AS
SELECT 
    rp.payment_id,
    ra.agreement_id,
    p.title as property_title,
    CONCAT(t.first_name, ' ', t.last_name) as tenant_name,
    CONCAT(l.first_name, ' ', l.last_name) as landlord_name,
    rp.amount,
    rp.payment_type,
    rp.due_date,
    rp.payment_date,
    rp.payment_status,
    (CURRENT_DATE - rp.due_date) as days_overdue
FROM rent_payments rp
JOIN rental_agreements ra ON rp.agreement_id = ra.agreement_id
JOIN properties p ON ra.property_id = p.property_id
JOIN users t ON ra.tenant_id = t.user_id
JOIN users l ON ra.landlord_id = l.user_id;

-- =====================================================
-- POSTGRESQL FUNCTIONS
-- =====================================================

-- Create a new property listing
CREATE OR REPLACE FUNCTION create_property_listing(
    p_owner_id BIGINT,
    p_title VARCHAR(255),
    p_description TEXT,
    p_property_type VARCHAR(50),
    p_bedrooms SMALLINT,
    p_bathrooms SMALLINT,
    p_price DECIMAL(12,2),
    p_state VARCHAR(100),
    p_city VARCHAR(100),
    p_address TEXT
)
RETURNS BIGINT AS $$
DECLARE
    v_property_id BIGINT;
BEGIN
    INSERT INTO properties (
        owner_id, title, description, property_type, bedrooms, 
        bathrooms, price, state, city, address, status
    ) VALUES (
        p_owner_id, p_title, p_description, p_property_type::property_type_enum, p_bedrooms,
        p_bathrooms, p_price, p_state, p_city, p_address, 'draft'
    ) RETURNING property_id INTO v_property_id;
    
    -- Log the activity
    INSERT INTO activity_logs (user_id, action, entity_type, entity_id, new_values)
    VALUES (p_owner_id, 'CREATE', 'properties', v_property_id, jsonb_build_object('status', 'draft'));
    
    RETURN v_property_id;
END;
$$ LANGUAGE plpgsql;

-- Process rent payment
CREATE OR REPLACE FUNCTION process_rent_payment(
    p_payment_id BIGINT,
    p_gateway_transaction_id VARCHAR(255),
    p_status VARCHAR(20)
)
RETURNS VOID AS $$
DECLARE
    v_agreement_id BIGINT;
    v_tenant_id BIGINT;
    v_amount DECIMAL(12,2);
    v_template_id INTEGER;
BEGIN
    -- Update payment status
    UPDATE rent_payments 
    SET 
        payment_status = p_status::payment_status_enum,
        gateway_transaction_id = p_gateway_transaction_id,
        payment_date = CASE WHEN p_status = 'completed' THEN NOW() ELSE payment_date END,
        updated_at = NOW()
    WHERE payment_id = p_payment_id;
    
    -- Get payment details for notification
    SELECT rp.agreement_id, ra.tenant_id, rp.amount
    INTO v_agreement_id, v_tenant_id, v_amount
    FROM rent_payments rp
    JOIN rental_agreements ra ON rp.agreement_id = ra.agreement_id
    WHERE rp.payment_id = p_payment_id;
    
    -- Send notification if payment completed
    IF p_status = 'completed' THEN
        SELECT template_id INTO v_template_id
        FROM notification_templates 
        WHERE template_name = 'payment_confirmation';
        
        INSERT INTO notifications (user_id, template_id, notification_type, status, metadata)
        VALUES (v_tenant_id, v_template_id, 'email', 'pending', 
                jsonb_build_object('payment_id', p_payment_id, 'amount', v_amount));
    END IF;
END;
$$ LANGUAGE plpgsql;

-- End of LETVANA DATABASE SCHEMA