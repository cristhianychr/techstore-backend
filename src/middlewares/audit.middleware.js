import { logAudit } from '../services/audit.service.js';

export const withAudit = (config, serviceFn) => {
    return async (...args) => {
        const userId = args[args.length - 1];
        const result = await serviceFn(...args);

        try {
            await logAudit({
                userId,
                action: config.action,
                entity: config.entity,
                entityId: result?.entityId?.toString(),
                oldData: result?.oldData || null,
                newData: result?.newData || null
            });
        } catch (error) {
            console.error('Audit log failed', error.message);
        }

        return result?.data || result;

    };
};