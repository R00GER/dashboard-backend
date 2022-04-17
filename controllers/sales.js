import { Router } from "express";
import Sale from "../models/Sale.js";

const salesRouter = Router();

salesRouter.get("/", async (req, res) => {
  try {
    const allSales = await Sale.find({});
    const formattedSales = allSales.map((salesAction) => {
      return {
        ...salesAction._doc,
        profit: salesAction.profit.includes("−")
          ? +salesAction.profit.replace(",", ".").replace("−", "-")
          : +salesAction.profit.replace(",", "."),
        sales: +salesAction.sales.replace(",", "."),
      };
    });

    const lastShipped = formattedSales
      .sort((a, b) => {
        const firstDate = new Date(a.shipDate);
        const secondDate = new Date(b.shipDate);

        return secondDate - firstDate;
      })
      .slice(0, 3);

    const totalSalesOrdersProfit = await formattedSales.reduce((acc, item) => {
      if (!acc[item.productId]) {
        acc[item.productId] = [];
        acc[item.productId].push({
          name: item.productName,
          id: item.productId,
          orders: 1,
          totalSales: item.sales,
          totalProfit: item.profit,
        });
      } else if (
        acc[item.productId] &&
        acc[item.productId][0].id === item.productId
      ) {
        acc[item.productId][0].totalSales =
          acc[item.productId][0].totalSales + +item.sales;
        acc[item.productId][0].orders = acc[item.productId][0].orders + 1;
        acc[item.productId][0].totalProfit =
          acc[item.productId][0].totalProfit + +item.profit;
      }

      return acc;
    }, {});

    const bestsellers = Object.values(totalSalesOrdersProfit)
      .sort((a, b) => b[0].totalSales - a[0].totalSales)
      .slice(0, 5);

    res.send({
      sales: formattedSales,
      bestsellers,
      lastShipped,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default salesRouter;
