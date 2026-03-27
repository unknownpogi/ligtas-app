export default {
  routes: [
    {
      method: "GET",
      path: "/accounts/allvolunteer",
      handler: "account.volunteer",
      config: {
        auth: false,
      },
    },
  ],
};
