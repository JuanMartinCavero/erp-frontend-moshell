import { useState, useEffect } from 'react';

export const usePermissions = () => {
    const [permissions, setPermissions] = useState([]);
    const [roleLevel, setRoleLevel] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPermissions = async () => {
            try {
                const storedPermissions = localStorage.getItem('userPermissions');
                const storedRoleLevel = localStorage.getItem('userRoleLevel');
                
                if (storedPermissions) {
                    setPermissions(JSON.parse(storedPermissions));
                    setRoleLevel(parseInt(storedRoleLevel) || 0);
                }
            } catch (error) {
                console.error('Error loading permissions:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadPermissions();
    }, []);

    // Verificar si tiene un permiso específico
    const hasPermission = (permissionSlug) => {
        return permissions.includes(permissionSlug);
    };

    // Verificar si tiene ALGUNO de los permisos
    const hasAnyPermission = (permissionList) => {
        return permissionList.some(perm => permissions.includes(perm));
    };

    // Verificar si tiene TODOS los permisos
    const hasAllPermissions = (permissionList) => {
        return permissionList.every(perm => permissions.includes(perm));
    };

    // Verificar si tiene cierto nivel de rol
    const hasRoleLevel = (minLevel) => {
        return roleLevel >= minLevel;
    };

    return {
        permissions,
        roleLevel,
        loading,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        hasRoleLevel
    };
};