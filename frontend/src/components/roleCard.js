function RoleCard({roleId, roleName,roleDesc,roleRes}) {
  const navigate = useNavigate();

  const routeChange = () =>{ 
      navigate('/SelectSkills', { state: { role_id: roleId } });