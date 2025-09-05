export const navlinks = () => {
  let roleId = 31;
  switch (roleId) {
    case 31:
      return [
        {
          name: "Dashboard",
          link: "/v/bluecore/dashboard",
        },
        {
          name: "Appointments",
          link: "/v/bluecore/all-appointments",
          child: [
            { name: "OP Appointments", link: "/v/bluecore/op-appointments" },
            { name: "IP Appointments", link: "/v/bluecore/ip-appointments" },
          ],
        },
        {
          name: "Patients",
          link: "/v/bluecore/all-patient",
        },
        {
          name: "Reports",
          link: "/v/bluecore/reports",
        },
      ];
    case 32:
      return [
        {
          name: "Participents",
          link: "/v/campaign/participants",
        },
      ];
    default:
      return [];
  }
};
