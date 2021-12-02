
const useGetUserPermissionsCrh = () => {
    // LÓGICA PARA PEGAR AS PERMISSÕES DAS PESSOAS

    return ['canSeeForm']
}

const useGetUserPermissionsGadi = () => {
    // LÓGICA PARA PEGAR AS PERMISSÕES DAS PESSOAS

    return ['canSeeGadi']
}

export const PermissionCrh = ({ children, permissions }) => {
    const userPermissions = useGetUserPermissionsCrh()

    if (permissions
        .some(permissions => {
            return userPermissions.includes(permissions)
        })
    ) {
        return children
    }
    return null
}

export const PermissionGadi = ({ children, permissions }) => {

    const userPermissions = useGetUserPermissionsGadi()

    if (permissions
        .some(permissions => {
            return userPermissions.includes(permissions)
        })
    ) {
        return children
    } else {
        return null
    }
}


