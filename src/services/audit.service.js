import { pgPool } from '../config/postgres.js'

export const logAudit = async({
    userId,
    action,
    entity,
    entityId,
    oldData = null,
    newData = null
}) => {
    const query = `
        INSERT INTO audit_logs
        (user_id, action, entity, entity_id, old_data, new_data)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await pgPool.query(query, [
        userId,
        action,
        entity,
        entityId,
        oldData,
        newData
    ]);
};