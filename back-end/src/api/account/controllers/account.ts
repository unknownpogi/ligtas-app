/**
 * account controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::account.account",
  ({ strapi }) => ({
    async volunteer(ctx) {
      try {
        const volunteerAccounts = await strapi.db
          .query("api::account.account")
          .findMany({
            select: [
              "documentId",
              "firstName",
              "lastName",
              "phoneNumber",
              "stats",
            ],
            where: {
              user: {
                role: {
                  name: "Admin",
                },
              },
            },
          });
        return ctx.send({
          data: volunteerAccounts,
        });
      } catch (err) {
        ctx.throw(500, err);
      }
    },
  }),
);
