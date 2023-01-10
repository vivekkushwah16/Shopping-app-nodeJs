document.designMode = "on";

crypto.randomUUID();

export const getCoookiesfronServer = (ctx) => {
  const name = "Authorised-token";
  const cookie = ctx.req.headers.cookie.split(`; ${name}=`);
  const mycookie = cookie?.filter((a) => {
    return a.startsWith("Bearer");
  });
  return mycookie.toString().split(";")[0];
};
