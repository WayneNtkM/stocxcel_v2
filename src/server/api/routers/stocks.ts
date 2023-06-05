// import { z } from 'zod';
import { publicProcedure, createTRPCRouter } from '../trpc';

interface Stocks { 
  stocks: [{ 
    change: number;
    close: number;
    logo: string;
    market_cap: number;
    name: string;
    sector: string;
    stock: string;
    volume: number;
  }]
}

export const stockRouter = createTRPCRouter({
  stocks: publicProcedure.query(async () => {
    const response = await fetch('https://brapi.dev/api/quote/list?');
    const data: Stocks = await response.json() as Stocks;
    const sortedArr = data.stocks
      .sort((a, b) => b.change - a.change);
    return {
      stocks: data.stocks,
      sorted: sortedArr.slice(0, 9),
    };
  }),
  // auth: procedure.query(async ({ ctx }) => {
  //   const { req } = ctx;
  //   const token = req.cookies['access-token'];
  //   if (!token ) {
  //     return null;
  //   }
  //   try {
  //     const payload = jwtFactory().verifyToken(token) as IUser;
  //     return payload;
  //   } catch (error: any) {
  //     console.log(error)
  //   }
  // }),
  // login: procedure
  // .input((z.object({
  //   email: z.string(),
  //   password: z.string(),
  // })))
  // .mutation(async ({ ctx }) => {
  //     const { req, res } = ctx;
  //     const user = req.body['0'] || req.body;
  //     try {
  //       const token = await ctx.useCase.loginUser(user);
  //       res.setHeader('Set-cookie', 'access-token=; Max-Age=0');
  //       res.setHeader(
  //         'Set-cookie',
  //         serialize("access-token", `${token}`,
  //         {
  //           maxAge: 5000,
  //           expires: new Date(),
  //           secure: process.env.NODE_ENV !== 'development',
  //           httpOnly: true,
  //           sameSite: "lax",
  //           path: "/"
  //         })
  //       );
  //       return token;
  //     } catch (error: any) {
  //       return { message: error.message, isError: true };
  //     }
  //   }),
});

export type AppRouter = typeof stockRouter;