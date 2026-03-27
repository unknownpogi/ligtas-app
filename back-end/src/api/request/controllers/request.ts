/**
 * request controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::request.request",
  ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized();

      const account = await strapi.db.query("api::account.account").findOne({
        where: { user: user.id },
      });

      if (!account) return ctx.badRequest("No account found for this user.");

      ctx.request.body.data = ctx.request.body.data || {};
      ctx.request.body.data.requester = account.id;

      const response = await super.create(ctx);
      return response;
    },

    async stats(ctx) {
      try {
        const pendingCount = await strapi
          .documents("api::request.request")
          .count({ filters: { stats: "Pending" } });

        const inProgressCount = await strapi
          .documents("api::request.request")
          .count({ filters: { stats: "In Progress" } });

        const resolvedCount = await strapi
          .documents("api::request.request")
          .count({ filters: { stats: "Resolved" } });

        return ctx.send({
          pending: pendingCount,
          inProgress: inProgressCount,
          resolved: resolvedCount,
        });
      } catch (err) {
        ctx.throw(500, err);
      }
    },
  }),
);
