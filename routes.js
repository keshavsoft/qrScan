import express from "express";

export default function setupRoutes(app) {
    app.use(express.static('Public'));
};