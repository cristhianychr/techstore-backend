CREATE TABLE audit_logs (
	id SERIAL PRIMARY KEY,
	user_id VARCHAR(50),
	action VARCHAR(50),
	entity VARCHAR(50),
	entity_id VARCHAR(50),
	old_data JSONB,
	new_data JSONB,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM audit_logs;