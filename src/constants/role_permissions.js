export default function (roleName) {
  const roles = {
    customer: [],
    admin: [],
    doctor: [],
  };
  return roles[roleName];
}
