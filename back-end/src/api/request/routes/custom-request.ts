export default {
  routes: [
    {
      method: "GET",
      path: "/requests/stats",
      handler: "request.stats",
      config: {
        auth: false,
      },
    },
  ],
};
