const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const { DashboardData } = require("../models/dashboards/dashboardData");

const routes = (app) => {
  const router = express.Router();

  router.post("/dashboards", (req, res) => {
    const dashboardData = new DashboardData(req.body);

    dashboardData
      .save()
      .then((result) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  router.get("/dashboards", (req, res) => {
    DashboardData.find({}, { __v: 0 })
      .then((dashboards) => {
        serverResponses.sendSuccess(res, messages.SUCCESSFUL, dashboards);
      })
      .catch((e) => {
        serverResponses.sendError(res, messages.BAD_REQUEST, e);
      });
  });

  app.use("/api", router);
};

module.exports = routes;
